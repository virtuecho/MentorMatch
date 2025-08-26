const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Mentor creates availble time slot
exports.createAvailability = async (req, res) => {
  try {
    const { startTime, endTime } = req.body;
    const mentorId = req.user.id;

    // Time validity
    if (new Date(startTime) >= new Date(endTime)) {
      return res.status(400).json({ error: 'End time must be after start time' });
    }

    // Create time slot
    const availabilitySlot = await prisma.availabilitySlot.create({
      data: {
        mentorId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
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

// Get availble time slot
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
    
    // Verify the mentor exists and is approved
    const mentor = await prisma.user.findUnique({
      where: { 
        id: parseInt(mentorId),
        role: 'mentor',
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
      orderBy: { startTime: 'asc' }
    });

    res.json(slots);
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