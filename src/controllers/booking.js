const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// This function can be accessed by mentee to book a mentor
exports.createBooking = async (req, res) => {
  try {
    const { availabilitySlotId, locationDetails } = req.body;
    const userId = req.user.id;

    const slot = await prisma.availabilitySlot.findUnique({ where: { id: availabilitySlotId } });

    if (!slot || slot.isBooked) {
        return res.status(400).json({ error: 'Slot unavailable or already booked' });
    }

    const booking = await prisma.booking.create({
        data: {
        menteeId: userId,
        mentorId: slot.mentorId,
        availabilitySlotId,
        topic: 'academic topic',
        locationType: 'in_person',
        locationDetails: locationDetails || '',
        status: 'pending'
        }
    });

    res.status(201).json({ message: 'Booking request sent', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

// This function can be accessed by mentee to cancel their own bookings on at a time
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const userId = req.user.id;

    const booking = await prisma.booking.findUnique({
        where: { id: bookingId }
    });

    if (!booking || booking.menteeId !== userId) {
        return res.status(403).json({ error: 'Unauthorized or booking not found' });
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

    res.json({ message: `Booking ${response}`, booking: updatedBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update booking status' });
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
        status: 'confirmed',
        availabilitySlot: {
          endTime: { lt: new Date() } // Only ended bookings
        }
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
    
    // Formatted
    const formattedBookings = bookings.map(booking => ({
      id: booking.id,
      topic: booking.topic,
      startTime: booking.availabilitySlot.startTime,
      endTime: booking.availabilitySlot.endTime,
      locationType: booking.locationType,
      locationDetails: booking.locationDetails,
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
    }));
    
    res.json(formattedBookings);
  } catch (err) {
    console.error('Get booking history error:', err);
    res.status(500).json({ error: 'Failed to fetch booking history' });
  }
};
