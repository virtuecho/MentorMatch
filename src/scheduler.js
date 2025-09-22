const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Clean up expired time slots and bookings
// Deletes expired time slots that are not booked
// Deletes expired bookings that were not confirmed
async function cleanupExpiredSlotsAndBookings() {
  const now = new Date();
  
  try {
    // Delete expired time slots that are not booked
    const deletedSlots = await prisma.availabilitySlot.deleteMany({
      where: {
        endTime: { lt: now },
        isBooked: false
      }
    });
    
    // Clean up failed bookings and their slots
    const expiredBookings = await prisma.booking.findMany({
      where: {
        availabilitySlot: {
          endTime: { lt: now }
        },
        status: { not: 'confirmed' }
      },
      include: { availabilitySlot: true }
    });
    
    for (const booking of expiredBookings) {
      // Delete the booking
      await prisma.booking.delete({ where: { id: booking.id } });
      
      // Delete the associated slot if it exists
      if (booking.availabilitySlot) {
        await prisma.availabilitySlot.delete({ 
          where: { id: booking.availabilitySlot.id } 
        });
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