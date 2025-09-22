const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Clean up expired time slots and bookings
// Deletes expired time slots that are not booked
// Deletes expired bookings that were not confirmed
async function cleanupExpiredSlotsAndBookings() {
  const now = new Date();

  try {
    // Fetch all unbooked slots and compute their endTime
    const allUnbookedSlots = await prisma.availabilitySlot.findMany({
      where: { isBooked: false },
      select: {
        id: true,
        startTime: true,
        durationMins: true
      }
    });

    const expiredSlotIds = allUnbookedSlots
      .filter(slot => {
        const endTime = new Date(slot.startTime.getTime() + slot.durationMins * 60000);
        return endTime < now;
      })
      .map(slot => slot.id);

    const deletedSlots = await prisma.availabilitySlot.deleteMany({
      where: { id: { in: expiredSlotIds } }
    });

    // Clean up failed bookings and their slots
    const expiredBookings = await prisma.booking.findMany({
      where: {
        status: { not: 'confirmed' }
      },
      include: {
        availabilitySlot: {
          select: {
            id: true,
            startTime: true,
            durationMins: true
          }
        }
      }
    });

    for (const booking of expiredBookings) {
      const slot = booking.availabilitySlot;
      if (slot) {
        const endTime = new Date(slot.startTime.getTime() + slot.durationMins * 60000);
        if (endTime < now) {
          await prisma.booking.delete({ where: { id: booking.id } });
          await prisma.availabilitySlot.delete({ where: { id: slot.id } });
        }
      }
    }

    console.log(`Cleaned up ${deletedSlots.count} expired slots and ${expiredBookings.length} expired bookings`);
  } catch (error) {
    console.error('Cleanup error:', error);
  }
}

// Start the cleanup scheduler
function startCleanupScheduler(interval = 60 * 60 * 1000) { // 60 * 60 * 1000 as every 60min default cleanup
  // Run immediately on startup
  cleanupExpiredSlotsAndBookings();
  
  // Set up periodic cleanup
  setInterval(cleanupExpiredSlotsAndBookings, interval);
  
  console.log(`Cleanup scheduler started, running every ${interval / 60000} minutes`);
}

module.exports = { 
  cleanupExpiredSlotsAndBookings,
  startCleanupScheduler
};