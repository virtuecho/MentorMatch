const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// This function can be accessed by mentee to book a mentor
exports.createBooking = async (req, res) => {
  try {
    const { 
      availabilitySlotId, 
      topic,
      description,
      note,
      numParticipants = 1,  
    } = req.body;
    const userId = req.user.id;

    // Basic validation
    if (!availabilitySlotId) {
      return res.status(400).json({ error: 'availabilitySlotId is required' });
    }
    if (typeof numParticipants !== 'number' || numParticipants < 1) {
      return res.status(400).json({ error: 'numParticipants must be a number ≥ 1' });
    }

    // Fetch slot
    const slot = await prisma.availabilitySlot.findUnique({ 
      where: { id: availabilitySlotId } 
    });
    if (!slot || slot.isBooked) {
      return res.status(400).json({ error: 'Slot unavailable or already booked' });
    }
    if (numParticipants > slot.maxParticipants) {
      return res.status(400).json({
        error: `numParticipants cannot exceed maxParticipants (${slot.maxParticipants})`
      });
    }

    const booking = await prisma.booking.create({
      data: {
        menteeId: userId,
        mentorId: slot.mentorId,
        availabilitySlotId,
        topic: topic || 'academic topic',
        description,
        note,
        numParticipants,
        status: 'pending'
      }
    });

    res.status(201).json({ message: 'Booking request sent', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

// This function is to cancel booking record one at a time
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const userId = req.user.id;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }
    });

    if (!booking) {
      return res.status(403).json({ error: 'Booking not found' });
    }

    const cancelled = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'cancelled' }
    });

    res.json({ message: 'Booking cancelled', booking: cancelled });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
};

// This function can be accessed by mentor to respond to bookings one at a time
exports.respondToBooking = async (req, res) => {
  try {
    const bookingId = parseInt(req.params.id);
    const mentorId = req.user.id;
    const { response } = req.body;

    if (!bookingId || isNaN(bookingId)) {
      return res.status(400).json({ error: 'Invalid booking ID', bookingId });
    }

    if (!['accepted', 'rejected'].includes(response)) {
        return res.status(400).json({ error: 'Invalid response. Must be accepted or rejected.' });
    }

    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });

    if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.mentorId !== mentorId) {
        return res.status(403).json({ error: 'Unauthorized: You are not the assigned mentor' });
    }

    if (booking.status !== 'pending') {
        return res.status(400).json({ error: 'Booking has been cancelled' });
    }

    const updatedBooking = await prisma.booking.update({
        where: { id: bookingId },
        data: { status: response }
    });

    if (response === 'accepted') {
      await prisma.availabilitySlot.update({
        where: { id: booking.availabilitySlotId },
        data: { isBooked: true }
      });
    }

    res.json({ message: `Booking ${response}`, booking: updatedBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { role } = req.query;

    if (!role || !['mentee', 'mentor'].includes(role)) {
      return res.status(400).json({
        error: "Invalid or missing 'role'."
      });
    }

    // Dynamic filter depending on role
    const whereCondition =
      role === 'mentee' ? { menteeId: userId } : { mentorId: userId };

    const bookings = await prisma.booking.findMany({
      where: whereCondition,
      include: {
        availabilitySlot: true,
        mentor: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                fullName: true,
                profileImageUrl: true
              }
            }
          }
        },
        mentee: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                fullName: true,
                profileImageUrl: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    // Format the response
    const formatted = bookings.map(b => ({
      id: b.id,
      topic: b.topic,
      description: b.description,
      note: b.note,
      numParticipants: b.numParticipants,
      status: b.status,
      createdAt: b.createdAt,
      updatedAt: b.updatedAt,
      slot: b.availabilitySlot,
      counterpart:
        role === 'mentee'
          ? {
              id: b.mentor.id,
              fullName: b.mentor.profile?.fullName,
              profileImageUrl: b.mentor.profile?.profileImageUrl,
              email: b.mentor.email
            }
          : {
              id: b.mentee.id,
              fullName: b.mentee.profile?.fullName,
              profileImageUrl: b.mentee.profile?.profileImageUrl,
              email: b.mentee.email
            }
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// Get booking history for a user
exports.getBookingHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { role } = req.query; // 'mentor' or 'mentee'
    
    // Validate role
    if (!role || (role !== 'mentor' && role !== 'mentee')) {
      return res.status(400).json({ error: 'Invalid role parameter. Must be "mentor" or "mentee".' });
    }
    
    // Determine which field to filter by based on role
    const filterField = role === 'mentor' ? 'mentorId' : 'menteeId';
    
    // Get confirmed bookings that have ended
    const bookings = await prisma.booking.findMany({
      where: {
        [filterField]: userId,
        status: 'accepted'
      },
      include: {
        availabilitySlot: true,
        mentor: {
          include: { 
            profile: {
              select: {
                fullName: true,
                profileImageUrl: true
              }
            }
          }
        },
        mentee: {
          include: { 
            profile: {
              select: {
                fullName: true,
                profileImageUrl: true
              }
            }
          }
        }
      },
      orderBy: {
        availabilitySlot: {
          startTime: 'desc'
        }
      }
    });
    
    const endedBookings = bookings.filter(booking => {
      const endTime = new Date(booking.availabilitySlot.startTime);
      endTime.setMinutes(endTime.getMinutes() + booking.availabilitySlot.durationMins);
      return endTime < new Date();
    });
    
    // Formatted
    const formattedBookings = endedBookings.map(booking => {
      const startTime = booking.availabilitySlot.startTime;
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + booking.availabilitySlot.durationMins);
      
      return {
        id: booking.id,
        topic: booking.topic,
        startTime,
        endTime,
        locationType: booking.availabilitySlot.locationType,
        locationDetails: booking.availabilitySlot.address,
        mentor: {
          id: booking.mentor.id,
          fullName: booking.mentor.profile?.fullName,
          profileImageUrl: booking.mentor.profile?.profileImageUrl
        },
        mentee: {
          id: booking.mentee.id,
          fullName: booking.mentee.profile?.fullName,
          profileImageUrl: booking.mentee.profile?.profileImageUrl
        }
      };
    });
    
    res.json(formattedBookings);
  } catch (err) {
    console.error('Get booking history error:', err);
    res.status(500).json({ error: 'Failed to fetch booking history' });
  }
};