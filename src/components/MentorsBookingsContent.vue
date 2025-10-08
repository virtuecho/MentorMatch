<template>
  <div class="my-bookings-container">
    <!-- Header Section -->
    <div class="header-section">
      <div class="title-section">
        <h1 class="page-title">Mentor's Bookings</h1>
        <p class="page-description">Manage your upcoming and past sessions with mentees.</p>
      </div>
      <div class="actions-section">
        <button class="create-meeting-btn" @click="createNewMeeting">
          + Create new meeting
        </button>
      </div>
    </div>

    <!-- Create Meeting Modal -->
    <CreateMeetingModal 
      v-if="showCreateModal" 
      @close="closeCreateModal" 
      @meeting-created="handleMeetingCreated"
    />

    <!-- Filter Tabs -->
    <div class="filter-tabs">
      <button 
        v-for="tab in filterTabs" 
        :key="tab.id"
        :class="['filter-tab', { 'active': activeFilter === tab.id }]"
        @click="setActiveFilter(tab.id)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Bookings List -->
    <div class="bookings-list">
        <div 
          v-for="booking in filteredBookings" 
          :key="booking.id"
          class="booking-card"
        >
        <div class="booking-content">
          <div class="booking-info">
            <div class="status-badge" :class="booking.status.toLowerCase()">
              {{ booking.status }}
            </div>
            <div class="booking-details">
              <h3 class="booking-time">{{ booking.time }}</h3>
              <p class="mentor-info">Mentee: {{ booking.mentee }}</p>
            </div>
          </div>
          <div class="booking-actions" v-if="booking.status === 'Accepted' || booking.status === 'Pending'">
            <template v-if="booking.status === 'Pending'">
              <button 
                class="accept-btn"
                @click="acceptBooking(booking)"
              >
                Accept
              </button>
              <button 
                class="reject-btn"
                @click="rejectBooking(booking)"
              >
                Reject
              </button>
            </template>
            <button v-if="booking.status === 'Accepted'" class="cancel-btn" @click="showCancelConfirmation(booking)">
              <span>Cancel</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="mentor-avatar">
          <img :src="booking.menteeAvatar" :alt="booking.mentee" />
        </div>
        </div>
     </div>

    <!-- Empty State -->
    <div v-if="filteredBookings.length === 0" class="empty-state">
      <p>No bookings found for the selected filter.</p>
    </div>

    <!-- Cancel Confirmation Modal -->
    <div v-if="showCancelModal" class="modal-overlay" @click="closeCancelModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
           <h3>Cancel Booking</h3>
         </div>
         <div class="modal-body">
           <p>Are you sure you want to cancel your booking with <strong>{{ bookingToCancel?.mentee }}</strong>?</p>
           <p class="modal-time">{{ bookingToCancel?.time }}</p>
           <p class="modal-warning">This action cannot be undone.</p>
         </div>
         <div class="modal-actions">
           <button class="modal-btn cancel-modal-btn" @click="closeCancelModal">
             Cancel
           </button>
           <button class="modal-btn confirm-modal-btn" @click="confirmCancelBooking">
             Confirm Cancel
           </button>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateMeetingModal from './CreateMeetingModal.vue'

export default {
  name: 'MentorsBookingsContent',
  components: {
    CreateMeetingModal
  },
  data() {
    return {
      activeFilter: 'all',
      showCancelModal: false,
      showCreateModal: false,
      bookingToCancel: null,
      filterTabs: [
        { id: 'all', label: 'All' },
        { id: 'pending', label: 'Pending' },
        { id: 'accepted', label: 'Accepted' },
        { id: 'rejected', label: 'Rejected' },
        { id: 'completed', label: 'Completed' },
        { id: 'published', label: 'Published' }
      ],
      bookings: [
        {
          id: 1,
          status: 'Accepted',
          time: 'Thu 22 Aug, 10:30 AEST • Carlton',
          mentee: 'Alice Wang',
          menteeAvatar: '/default-avatar.jpg'
        },
        {
          id: 2,
          status: 'Pending',
          time: 'Fri 23 Aug, 14:00 AEST • Parkville',
          mentee: 'Bob Lee',
          menteeAvatar: '/default-avatar.jpg'
        },
        {
          id: 3,
          status: 'Pending',
          time: 'Mon 26 Aug, 09:00 AEST • Southbank',
          mentee: 'Charlie Chen',
          menteeAvatar: '/default-avatar.jpg'
        },
        {
          id: 4,
          status: 'Rejected',
          time: 'Tue 27 Aug, 15:30 AEST • Carlton',
          mentee: 'Diana Smith',
          menteeAvatar: '/default-avatar.jpg'
        },
        {
          id: 5,
          status: 'Completed',
          time: 'Wed 21 Aug, 11:00 AEST • Parkville',
          mentee: 'Emma Johnson',
          menteeAvatar: '/default-avatar.jpg'
        },
        {
          id: 6,
          status: 'Accepted',
          time: 'Thu 29 Aug, 16:00 AEST • Carlton',
          mentee: 'Frank Wilson',
          menteeAvatar: '/default-avatar.jpg'
        },
        {
          id: 7,
          status: 'Published',
          time: 'Fri 30 Aug, 18:00 AEST • North Melbourne',
          mentee: 'N/A',
          menteeAvatar: '/default-avatar.jpg'
        }
      ]
    }
  },
  computed: {
    filteredBookings() {
      if (this.activeFilter === 'published') {
        return this.bookings
      } else if (this.activeFilter === 'all') {
        return this.bookings.filter(booking =>
          booking.status.toLowerCase() !== 'published'
          )
      } else {
        return this.bookings.filter(booking => 
          booking.status.toLowerCase() === this.activeFilter
        )
      }
    }
  },
  methods: {
    setActiveFilter(filterId) {
      this.activeFilter = filterId
    },
    createNewMeeting() {
      this.showCreateModal = true
    },
    closeCreateModal() {
      this.showCreateModal = false
    },
    handleMeetingCreated(meetingData) {
      // Add the new meeting to bookings list
      const newBooking = {
        id: this.bookings.length + 1,
        status: 'Pending',
        time: `${meetingData.date}, ${meetingData.time} • ${meetingData.location}`,
        mentee: 'New Meeting',
        menteeAvatar: '/default-avatar.jpg'
      }
      this.bookings.unshift(newBooking)
      this.closeCreateModal()
    },
    showCancelConfirmation(booking) {
      this.bookingToCancel = booking
      this.showCancelModal = true
    },
    closeCancelModal() {
      this.showCancelModal = false
      this.bookingToCancel = null
    },
    confirmCancelBooking() {
      if (this.bookingToCancel) {
        this.bookingToCancel.status = 'Cancelled'
        this.closeCancelModal()
      }
    },
    acceptBooking(booking) {
      // TODO: Implement accept booking functionality
      console.log('Accepting booking:', booking)
      // This would typically make an API call to accept the booking
      booking.status = 'Accepted'
    },
    rejectBooking(booking) {
      // TODO: Implement reject booking functionality
      console.log('Rejecting booking:', booking)
      // This would typically make an API call to reject the booking
      booking.status = 'Rejected'
    }
  }
}
</script>

<style scoped>
.my-bookings-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #ffffff;
}

/* Header with action on the right */
.header-section {
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.title-section {
  text-align: left;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.page-description {
  font-size: 16px;
  color: #666666;
  margin: 0;
  line-height: 1.5;
}

.actions-section {
  display: flex;
  align-items: center;
}

.create-meeting-btn {
  height: 40px;
  padding: 0 16px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(59, 130, 246, 0.35);
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
  white-space: nowrap;
}

.create-meeting-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(59, 130, 246, 0.45);
}

.create-meeting-btn:active {
  transform: translateY(0);
  opacity: 0.95;
}

/* Filter Tabs (copied to match MyBookings) */
.filter-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  padding: 4px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  width: fit-content;
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.filter-tab {
  padding: 10px 20px;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  position: relative;
  white-space: nowrap;
  min-width: 80px;
  text-align: center;
}

.filter-tab:hover {
  background: rgba(255, 255, 255, 0.7);
  color: #475569;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.filter-tab.active {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: #ffffff;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  transform: translateY(-1px);
}

.filter-tab.active::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(135deg, #60a5fa, #3b82f6, #1e40af);
  border-radius: 13px;
  z-index: -1;
  opacity: 0.8;
}

.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.booking-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background-color: #f8f9fa;
  border-radius: 20px;
  border: 1px solid #e9ecef;
  transition: all 0.2s ease;
}

.booking-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.booking-content {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.booking-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  width: fit-content;
}

.status-badge.accepted {
  background-color: #d4edda;
  color: #155724;
}

.status-badge.pending {
  background-color: #fff3cd;
  color: #856404;
}

.status-badge.rejected {
  background-color: #f8d7da;
  color: #721c24;
}

.status-badge.completed {
  background-color: #d1ecf1;
  color: #0c5460;
}

.status-badge.cancelled {
  background-color: #f8d7da;
  color: #721c24;
}
.status-badge.published {
  background-color: #cccccc;
  color: #575757;
}

.booking-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.booking-time {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.mentor-info {
  font-size: 14px;
  color: #666666;
  margin: 0;
}

.booking-actions {
  display: flex;
  align-items: center;
}

.accept-btn, .reject-btn, .cancel-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 8px;
}

.accept-btn {
  background-color: #22c55e;
  color: white;
  border-color: #22c55e;
}

.accept-btn:hover {
  background-color: #16a34a;
  border-color: #16a34a;
}

.reject-btn {
  background-color: #ef4444;
  color: white;
  border-color: #ef4444;
}

.reject-btn:hover {
  background-color: #dc2626;
  border-color: #dc2626;
}

.cancel-btn {
  background-color: #ffffff;
  color: #1a1a1a;
}

.cancel-btn:hover {
  background-color: #f5f5f5;
  border-color: #d0d0d0;
  color: #ef4444;
}

.cancel-btn svg {
  width: 16px;
  height: 16px;
}

.booking-actions {
  display: flex;
  align-items: center;
}

.mentor-avatar img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}



/* Empty state */
.empty-state {
  text-align: center;
  color: #64748b;
  padding: 24px 0;
}

/* Modal styles - align with MyBookings */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  padding: 24px 24px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.modal-body {
  padding: 16px 24px 24px;
}

.modal-body p {
  margin: 0 0 12px;
  color: #374151;
  line-height: 1.5;
}

.modal-time {
  font-weight: 500;
  color: #6b7280;
  font-size: 14px;
}

.modal-warning {
  color: #dc2626;
  font-size: 14px;
  font-weight: 500;
}

.modal-actions {
  padding: 16px 24px 24px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.modal-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  min-width: 80px;
}

.cancel-modal-btn {
  background: #f9fafb;
  color: #374151;
  border-color: #d1d5db;
}

.cancel-modal-btn:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.confirm-modal-btn {
  background: #dc2626;
  color: white;
}

.confirm-modal-btn:hover {
  background: #b91c1c;
}

/* Responsive */
@media (max-width: 768px) {
  .header-section {
    align-items: stretch;
  }
  .actions-section {
    width: 100%;
  }
  .create-meeting-btn {
    width: 100%;
  }
  .booking-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .booking-content {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .mentor-avatar {
    width: 60px;
    height: 60px;
    align-self: flex-end;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 24px;
  }
  .filter-tabs {
    gap: 4px;
    padding: 2px;
    border-radius: 12px;
    margin-bottom: 24px;
  }
  .filter-tab {
    padding: 8px 12px;
    font-size: 12px;
    min-width: 60px;
    border-radius: 8px;
  }
  .filter-tab:hover {
    transform: none;
  }
  .filter-tab.active {
    transform: none;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  }
  .booking-card {
    padding: 16px;
  }
  .booking-time {
    font-size: 14px;
  }
  .mentor-info {
    font-size: 13px;
  }
  .modal-overlay {
    padding: 16px;
  }
  .modal-content {
    max-width: 320px;
  }
  .modal-header {
    padding: 20px 20px 12px;
  }
  .modal-header h3 {
    font-size: 16px;
  }
  .modal-body {
    padding: 12px 20px 20px;
  }
  .modal-actions {
    padding: 12px 20px 20px;
    flex-direction: column;
    gap: 8px;
  }
  .modal-btn {
    width: 100%;
    padding: 12px 16px;
  }
}
</style>