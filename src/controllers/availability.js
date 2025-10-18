const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Mentor creates availble time slot
exports.createAvailability = async (req, res) => {
  try {
    const {
      title,
      startTime,
      durationMins,
      locationType = 'in_person', // default fallback
      city,
      address,
      maxParticipants = 2,
      note
    } = req.body;

    const mentorId = req.user.id;

    // Basic validation
    if (!startTime || !durationMins || !city || !address) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const parsedStart = new Date(startTime);
    if (isNaN(parsedStart.getTime())) {
      return res.status(400).json({ error: 'Invalid startTime format' });
    }

    if (durationMins <= 0) {
      return res.status(400).json({ error: 'Duration must be a positive number' });
    }

    // Create slot
    const availabilitySlot = await prisma.availabilitySlot.create({
      data: {
        mentorId,
        title,
        startTime: parsedStart,
        durationMins,
        locationType,
        city,
        address,
        maxParticipants,
        note,
        isBooked: false
      }
    });

    res.status(201).json({
      message: 'Availability slot created successfully',
      slot: availabilitySlot
    });
  } catch (err) {
    console.error('Create availability error:', err);
    res.status(500).json({ error: 'Failed to create availability slot' });
  }
};


// Get available time slot
exports.getMyAvailability = async (req, res) => {
  try {
    const mentorId = req.user.id;
    
    const slots = await prisma.availabilitySlot.findMany({
      where: { mentorId },
      orderBy: { startTime: 'asc' }
    });

    res.json(slots);
  } catch (err) {
    console.error('Get availability error:', err);
    res.status(500).json({ error: 'Failed to fetch availability slots' });
  }
};

exports.getMentorAvailability = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const { currentUserId } = req.user?.id;
    
    // Verify the mentor exists and is approved
    const mentor = await prisma.user.findUnique({
      where: { 
        id: parseInt(mentorId),
        isMentorApproved: true
      }
    });

    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    const slots = await prisma.availabilitySlot.findMany({
      where: { 
        mentorId: parseInt(mentorId),
        isBooked: false
      },
      orderBy: { startTime: 'asc' },
      include: {
        booking: currentUserId
          ? {
              where: {
                menteeId: currentUserId,
              },
              select: {
                id: true,
                status: true,
                menteeId: true,
              }
            }
          : false
      }

    });

    const response = slots.map(slot => ({
      id: slot.id,
      mentorId: slot.mentorId,
      title: slot.title,
      startTime: slot.startTime,
      durationMins: slot.durationMins,
      city: slot.city,
      address: slot.address,
      note: slot.note,
      isBooked: slot.isBooked,
      isRequested: Array.isArray(slot.booking) ? slot.booking.length > 0 : false
    }));

    res.json(response);
  } catch (err) {
    console.error('Get mentor availability error:', err);
    res.status(500).json({ error: 'Failed to fetch mentor availability' });
  }
};

// Delete availble time slot
exports.deleteAvailability = async (req, res) => {
  try {
    const { slotId } = req.params;
    const mentorId = req.user.id;

    // Verify the slot belongs to the current user
    const slot = await prisma.availabilitySlot.findFirst({
      where: { id: parseInt(slotId), mentorId }
    });

    if (!slot) {
      return res.status(404).json({ error: 'Availability slot not found' });
    }

    await prisma.availabilitySlot.delete({
      where: { id: parseInt(slotId) }
    });

    res.json({ message: 'Availability slot deleted successfully' });
  } catch (err) {
    console.error('Delete availability error:', err);
    res.status(500).json({ error: 'Failed to delete availability slot' });
  }
};