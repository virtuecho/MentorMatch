<template>
  <div class="mentor-profile-content">
    <div class="mentor-profile-container">
      <!-- Back Button -->
      <div class="back-section">
        <button @click="goBack" class="back-button">
          <svg class="back-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Back to dashboard
        </button>
      </div>

      <!-- Mentor Profile Card -->
      <div class="mentor-profile-card">
        <!-- Left Side - Avatar and Basic Info -->
        <div class="mentor-profile-left">
          <div class="mentor-avatar-section">
            <div class="mentor-avatar-container">
              <img 
                :src="mentor.avatar || '/default-avatar.svg'"
                alt="Mentor Avatar"
                class="mentor-avatar-image"
              />
            </div>
            <div class="mentor-basic-info">
              <h1 class="mentor-name">{{ mentor.fullName || 'Mentor Name' }}</h1>
              <p class="mentor-title">{{ mentor.professionalTitle || 'Professional Title' }}</p>
              <p class="mentor-company">{{ mentor.company || 'Company Name' }}</p>
              <p class="mentor-location">{{ mentor.location || 'Location' }}</p>
            </div>
          </div>

          <!-- Available Sessions Section -->
        <div class="available-sessions-section">
          <h3 class="sessions-title"></h3>
          
          <!-- Filter Info -->
          <div v-if="hasActiveFilters" class="filter-info">
            <div class="filter-info-header">
              <span class="filter-icon">🔍</span>
              <span class="filter-text">Filtered results based on your dashboard selection:</span>
            </div>
            <div class="active-filters">
              <span v-if="filterDate" class="filter-tag">
                📅 {{ formatFilterDate(filterDate) }}
              </span>
              <span v-if="filterTime" class="filter-tag">
                🕐 {{ formatFilterTime(filterTime) }}
              </span>
              <span v-if="filterCity" class="filter-tag">
                📍 {{ formatFilterCity(filterCity) }}
              </span>
            </div>
          </div>
            
            <!-- Loading State -->
            <div v-if="isLoadingSessions" class="loading-state">
              <p>Loading available sessions...</p>
            </div>
            
            <!-- No Sessions Available -->
            <div v-else-if="availableSessions.length === 0" class="no-sessions-state">
              <p>No available sessions at the moment.</p>
              <p class="no-sessions-subtitle">Please check back later or contact the mentor directly.</p>
            </div>
            
            <!-- Available Sessions List -->
            <div v-else class="sessions-list">
              <div 
                v-for="session in availableSessions" 
                :key="session.id"
                class="session-card"
                :class="{ 'session-booked': session.isBooked }"
              >
                <div class="session-info">
                  <div class="session-date">
                    {{ formatDate(session.startTime) }}
                  </div>
                  <div class="session-time">
                    {{ formatTime(session.startTime) }} - {{ formatEndTime(session.startTime, session.durationMins) }}
                  </div>
                  <div class="session-duration">
                    {{ session.durationMins }} minutes
                  </div>
                  <div class="session-location">
                    📍 {{ session.city }}
                  </div>
                  <div v-if="session.address" class="session-address">
                    {{ session.address }}
                  </div>
                </div>
                
                <div class="session-actions">
                  <button 
                    v-if="!session.isBooked"
                    @click="openBooking(session)"
                    class="request-booking-btn"
                    :disabled="isRequestingBooking"
                  >
                    {{ isRequestingBooking ? 'Requesting...' : 'Request' }}
                  </button>
                  <span v-else class="session-status booked">
                    Booked
                  </span>
                </div>
              </div>

              <!-- Modal -->
              <BookingModal
                v-if="showBooking"
                :slot="selectedSlot"
                @close="closeBooking"
                @submitted="handleSubmitted"
              />

            </div>
          </div>
        </div>
        
        <!-- Right Side - Detailed Information -->
        <div class="mentor-profile-right">
          <!-- About Section -->
          <div class="info-section">
            <h2 class="section-title">About</h2>
            <p class="mentor-bio">
              {{ mentor.bio || 'This user hasn\'t added anything to their bio.' }}
            </p>
          </div>

          <!-- Social Media Section -->
          <div class="info-section">
            <h2 class="section-title">Social Media</h2>
            <div class="social-links">
              <a 
                v-if="normalizedMentorSocial.instagram"
                :href="normalizedMentorSocial.instagram"
                class="social-link instagram"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                <!-- Instagram Icon -->
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="#DB2777" stroke-width="1.8"/>
                  <circle cx="12" cy="12" r="4" stroke="#DB2777" stroke-width="1.8"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="#DB2777"/>
                </svg>
              </a>
              <a 
                v-if="normalizedMentorSocial.facebook"
                :href="normalizedMentorSocial.facebook"
                class="social-link facebook"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
              >
                <!-- Facebook Icon -->
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#2563EB" stroke-width="1.8"/>
                  <path d="M13 10h2V8h-2c-1.1 0-2 .9-2 2v2H9v2h2v4h2v-4h2v-2h-2v-2c0-.55.45-1 1-1Z" fill="#2563EB"/>
                </svg>
              </a>
              <a 
                v-if="normalizedMentorSocial.linkedin"
                :href="normalizedMentorSocial.linkedin"
                class="social-link linkedin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <!-- LinkedIn Icon -->
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke="#0EA5E9" stroke-width="1.8"/>
                  <circle cx="8" cy="10" r="2" fill="#0EA5E9"/>
                  <rect x="6.5" y="12" width="3" height="6.5" fill="#0EA5E9"/>
                  <path d="M12 12h2.5a3 3 0 0 1 3 3v3.5H14.5V15.5c0-.55-.45-1-1-1H12V12Z" fill="#0EA5E9"/>
                </svg>
              </a>
            </div>
            <p 
              v-if="!normalizedMentorSocial.instagram && !normalizedMentorSocial.facebook && !normalizedMentorSocial.linkedin" 
              class="empty-social"
            >
              No social media provided.
            </p>
          </div>

          <!-- Expertise Section -->
          <div class="info-section">
            <h2 class="section-title">Expertise</h2>
            <div class="expertise-tags">
              <span 
                v-for="skill in mentor.skills || ['Web Development', 'JavaScript', 'React']"
                :key="skill"
                class="expertise-tag"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <!-- Experience Section -->
          <div class="info-section">
            <h2 class="section-title">Experience</h2>
            <div class="experience-item">
              <h3 class="experience-title">{{ mentor.professionalTitle || 'Professional Title' }}</h3>
              <p class="experience-company">{{ mentor.company || 'Company Name' }}</p>
              <p class="experience-duration">{{ mentor.experience || '2+ years' }}</p>
            </div>
          </div>

          <!-- Education Section -->
          <div class="info-section">
            <h2 class="section-title">Education</h2>
            <div class="education-item">
              <h3 class="education-degree">{{ mentor.degree || 'Bachelor of Computer Science' }}</h3>
              <p class="education-university">{{ mentor.university || 'University Name' }}</p>
              <p class="education-year">{{ mentor.graduationYear || '2020' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookingModal from '@/components/BookingModal.vue'
import { getMentorProfile } from '@/services/mentor';
import { getMentorAvailability } from '@/services/availability';

export default {
  name: 'MentorPersonalProfileContent',
  components: {
    BookingModal
  },
  props: {
    mentorId: {
      type: String,
      required: true
    }
  },
  computed: {
     // Get filter parameters from route query
     filterDate() {
       return this.$route.query.date || '';
     },
     filterTime() {
       return this.$route.query.time || '';
     },
     filterCity() {
       return this.$route.query.city || '';
     },
     hasActiveFilters() {
       return this.filterDate || this.filterTime || this.filterCity;
     },
     normalizedMentorSocial() {
       const normalize = (val, base) => {
         if (!val) return '';
         const trimmed = String(val).trim();
         if (/^https?:\/\//i.test(trimmed)) return trimmed;
         const handle = trimmed.replace(/^@/, '');
         return `${base}${handle}`;
       };
       return {
         instagram: normalize(this.mentor.instagramUrl, 'https://instagram.com/'),
         facebook: normalize(this.mentor.facebookUrl, 'https://facebook.com/'),
         linkedin: normalize(this.mentor.linkedinUrl, 'https://www.linkedin.com/in/')
       };
     }
   },
  data() {
    return {
      mentor: {
        fullName: '',
        professionalTitle: '',
        company: '',
        location: '',
        bio: '',
        avatar: '',
        skills: [],
        experience: '',
        degree: '',
        university: '',
        graduationYear: '',
        instagramUrl: '',
        facebookUrl: '',
        linkedinUrl: ''
      },
      availableSessions: [],
      isLoadingSessions: true,
      isRequestingBooking: false,
      showSessions: true,
      showBooking: false,
      selectedSlot: null
    }
  },
  async mounted() {
    await this.loadMentorProfile();
    await this.loadAvailableSessions();
  },
  methods: {
    async loadMentorProfile() {
      try {
        const res = await getMentorProfile({ mentorId: this.mentorId });
        const info = res.data;

        this.mentor = {
          fullName: info.profile?.fullName || info.email,
          professionalTitle: 'Senior Software Engineer',
          company: 'Google Australia',
          location: info.profile?.location || '',
          bio: info.profile?.bio || 'This user hasn\'t added anything to their bio.',
          avatar: info.profile?.profileImageUrl || '/default-avatar.svg',
          skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Leadership'],
          experience: '8+ years',
          degree: 'PhD in Computer Science',
          university: 'University of Sydney',
          graduationYear: '2015',
          instagramUrl: info.profile?.instagramUrl || '',
          facebookUrl: info.profile?.facebookUrl || '',
          linkedinUrl: info.profile?.linkedinUrl || ''
        };
      } catch (error) {
        console.error('Failed to load mentor profile:', error);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    async loadAvailableSessions() {
      try {
        this.isLoadingSessions = true;
        
        let allSessions = [];
        const res = await getMentorAvailability({ mentorId: this.mentorId });
        const slots = res.data || [];
        allSessions = slots.map(slot => ({
          id: slot.id,
          startTime: slot.startTime,
          durationMins: slot.durationMins,
          city: slot.city ? slot.city.charAt(0).toUpperCase() + slot.city.slice(1).toLowerCase() : '',
          address: slot.address || '',
          isBooked: Boolean(slot.isBooked) || Boolean(slot.isRequested)
        }));
        
        // Apply filters from dashboard
        if (this.filterDate) {
          const filterDateStr = new Date(this.filterDate).toISOString().split('T')[0];
          allSessions = allSessions.filter(session => {
            const sessionDateStr = new Date(session.startTime).toISOString().split('T')[0];
            return sessionDateStr === filterDateStr;
          });
        }
        
        if (this.filterTime) {
          allSessions = allSessions.filter(session => {
            const sessionTime = new Date(session.startTime).toTimeString().slice(0, 5);
            return sessionTime === this.filterTime;
          });
        }
        
        if (this.filterCity) {
          allSessions = allSessions.filter(session => {
            return session.city.toLowerCase() === this.filterCity.toLowerCase();
          });
        }
        
        this.availableSessions = allSessions;
      } catch (error) {
        console.error('Failed to load available sessions:', error);
        this.availableSessions = [];
      } finally {
        this.isLoadingSessions = false;
      }
    },
    async requestBooking(session) {
      try {
        this.isRequestingBooking = true;
        
        // TODO: Replace with actual API call to request booking
        // const response = await requestSessionBooking(session.id);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        alert(`Booking request sent for session on ${this.formatDate(session.startTime)} at ${this.formatTime(session.startTime)}. The mentor will review your request.`);
        
        // Optionally refresh the sessions list
        await this.loadAvailableSessions();
        
      } catch (error) {
        console.error('Failed to request booking:', error);
        alert('Failed to send booking request. Please try again.');
      } finally {
        this.isRequestingBooking = false;
      }
    },
    openBooking(session) {
      this.selectedSlot = session;
      this.showBooking = true;
    },
    closeBooking() {
      this.showBooking = false;
      this.selectedSlot = null;
    },
    handleSubmitted() {
      if (this.selectedSlot) {
        const bookedSession = this.availableSessions.find(
          session => session.id === this.selectedSlot.id
        );
        if (bookedSession) {
          bookedSession.isBooked = true;
        }
      }
      this.closeBooking();
      // Refresh sessions to show updated booked status
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    formatTime(dateString) {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-AU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    },
    formatEndTime(startTimeString, durationMins) {
      const startTime = new Date(startTimeString);
      const endTime = new Date(startTime.getTime() + durationMins * 60000);
      return endTime.toLocaleTimeString('en-AU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    },
    
    // Format filter display methods
    formatFilterDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    
    formatFilterTime(timeStr) {
      const [hours, minutes] = timeStr.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    },
    
    formatFilterCity(cityStr) {
      return cityStr.charAt(0).toUpperCase() + cityStr.slice(1);
    }
  }
}
</script>

<style scoped>
.mentor-profile-content {
  background: #eeeeee;
  min-height: calc(100vh - 64px);
  padding: 35px 0;
}

.mentor-profile-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 35px;
}

.back-section {
  margin-bottom: 24px;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #666666;
  font-family: Inter, sans-serif;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 0;
  transition: color 0.2s ease;
}

.back-button:hover {
  color: #000000;
}

.back-icon {
  width: 16px;
  height: 16px;
}

.mentor-profile-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 47px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 60px;
}

.mentor-profile-left {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.mentor-avatar-section {
  text-align: center;
}

.mentor-avatar-container {
  width: 200px;
  height: 200px;
  margin: 0 auto 24px;
  position: relative;
}

.mentor-avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f0f0f0;
}

.mentor-basic-info {
  text-align: center;
}

.mentor-name {
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #000000;
  margin: 0 0 8px 0;
}

.mentor-title {
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #333333;
  margin: 0 0 4px 0;
}

.mentor-company {
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #666666;
  margin: 0 0 4px 0;
}

.mentor-location {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #888888;
  margin: 0;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.book-session-container {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.book-session-btn {
  background: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.book-session-btn:hover {
  background: #0056b3;
}

.book-icon {
  font-size: 18px;
}

/* Calendar Section */
.calendar-section {
  margin-top: 32px;
  padding: 24px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.calendar-title {
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #1f2937;
  margin: 0 0 20px 0;
}

.calendar-inputs {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.calendar-input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.calendar-input-group label {
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #374151;
}

.calendar-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
  font-family: Inter, sans-serif;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.calendar-input:hover {
  border-color: #9ca3af;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.calendar-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.time-select {
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"><path fill="%23666" d="M2 0L0 2h4zm0 5L0 3h4z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
  padding-right: 40px;
}

.confirm-booking-btn {
  margin-top: 16px;
  padding: 12px 24px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;
}

.confirm-booking-btn:hover {
  background: #059669;
  transform: translateY(-1px);
}

.mentor-profile-right {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.info-section {
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 24px;
}

.info-section:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.section-title {
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #000000;
  margin: 0 0 16px 0;
}

.mentor-bio {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
  color: #333333;
  margin: 0;
}

.expertise-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.expertise-tag {
  background: #f8f9fa;
  color: #495057;
  padding: 6px 12px;
  border-radius: 16px;
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 14px;
  border: 1px solid #e9ecef;
}

.experience-item,
.education-item {
  margin-bottom: 16px;
}

.experience-item:last-child,
.education-item:last-child {
  margin-bottom: 0;
}

.experience-title,
.education-degree {
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #000000;
  margin: 0 0 4px 0;
}

.experience-company,
.education-university {
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #666666;
  margin: 0 0 2px 0;
}

.experience-duration,
.education-year {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #888888;
  margin: 0;
}

/* Available Sessions Styles */
.available-sessions-section {
  width: 100%;
}

.sessions-title {
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #1f2937;
  margin-bottom: 20px;
  text-align: center;
}

/* Filter Info Styles */
.filter-info {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 1px solid #0ea5e9;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.filter-info-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.filter-icon {
  font-size: 1.1rem;
  margin-right: 0.5rem;
}

.filter-text {
  font-size: 0.9rem;
  color: #0369a1;
  font-weight: 500;
}

.active-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-tag {
  background: #ffffff;
  color: #0369a1;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid #0ea5e9;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.loading-state,
.no-sessions-state {
  text-align: center;
  padding: 40px 20px;
  color: #6b7280;
}

.no-sessions-subtitle {
  font-size: 14px;
  margin-top: 8px;
  opacity: 0.8;
}

.sessions-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 8px;
}

.session-card {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.session-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.session-card.session-booked {
  background: #fef3c7;
  border-color: #f59e0b;
}

.session-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.session-date {
  font-weight: 600;
  font-size: 16px;
  color: #1f2937;
}

.session-time {
  font-weight: 500;
  font-size: 14px;
  color: #4f46e5;
}

.session-duration {
  font-size: 13px;
  color: #6b7280;
  background: #e5e7eb;
  padding: 4px 8px;
  border-radius: 6px;
  display: inline-block;
  width: fit-content;
}

.session-location {
  font-size: 14px;
  color: #059669;
  font-weight: 500;
}

.session-address {
  font-size: 12px;
  color: #6b7280;
  margin-left: 16px;
}

.session-actions {
  display: flex;
  align-items: center;
}

.request-booking-btn {
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.request-booking-btn:hover:not(:disabled) {
  background: #4338ca;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.request-booking-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.session-status {
  font-size: 12px;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 6px;
  white-space: nowrap;
}

.session-status.booked {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #f59e0b;
}

/* Scrollbar Styling */
.sessions-list::-webkit-scrollbar {
  width: 6px;
}

.sessions-list::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.sessions-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.sessions-list::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Responsive Design */
@media (max-width: 768px) {
  .mentor-profile-container {
    padding: 0 20px;
  }
  
  .mentor-profile-card {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 32px 24px;
  }
  
  .mentor-avatar-container {
    width: 150px;
    height: 150px;
  }
  
  .mentor-name {
    font-size: 24px;
  }
  

}
.social-links {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 8px;
}
.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}
.social-link:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
}
.empty-social {
  font-size: 13px;
  color: #6b7280;
  margin-top: 8px;
}
</style>