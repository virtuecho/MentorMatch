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

          <!-- Action Buttons -->
          <div class="action-buttons">
            <button class="book-session-btn" @click="showCalendar">
              Book a Session
            </button>
          </div>

          <!-- Calendar Section -->
          <div v-if="isCalendarVisible" class="calendar-section">
            <h3 class="calendar-title">Select Date & Time</h3>
            <div class="calendar-inputs">
              <div class="calendar-input-group">
                <label for="session-date">Date</label>
                <input 
                  id="session-date"
                  type="date" 
                  v-model="selectedDate" 
                  class="calendar-input"
                  :min="today"
                />
              </div>
              <div class="calendar-input-group">
                <label for="session-time">Time</label>
                <select 
                  id="session-time"
                  v-model="selectedTime" 
                  class="calendar-input time-select"
                >
                  <option value="">Select time</option>
                  <option v-for="time in availableTimeSlots" :key="time.value" :value="time.value">
                    {{ time.label }}
                  </option>
                </select>
              </div>
            </div>
            <button 
              v-if="selectedDate && selectedTime" 
              @click="bookSelectedTime" 
              class="confirm-booking-btn"
            >
              Confirm Booking
            </button>
          </div>
        </div>
        
        <!-- Right Side - Detailed Information -->
        <div class="mentor-profile-right">
          <!-- About Section -->
          <div class="info-section">
            <h2 class="section-title">About</h2>
            <p class="mentor-bio">
              {{ mentor.bio || 'This mentor has not provided a bio yet. Please check back later for more information about their background and expertise.' }}
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
export default {
  name: 'MentorPersonalProfileContent',
  props: {
    mentorId: {
      type: String,
      required: true
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
        graduationYear: ''
      },
      selectedDate: '',
      selectedTime: '',
      today: new Date().toISOString().split('T')[0],
      isCalendarVisible: false,
      availableTimeSlots: [
        { value: '09:00', label: '9:00 AM' },
        { value: '10:00', label: '10:00 AM' },
        { value: '11:00', label: '11:00 AM' },
        { value: '12:00', label: '12:00 PM' },
        { value: '13:00', label: '1:00 PM' },
        { value: '14:00', label: '2:00 PM' },
        { value: '15:00', label: '3:00 PM' },
        { value: '16:00', label: '4:00 PM' },
        { value: '17:00', label: '5:00 PM' }
      ]
    }
  },
  async mounted() {
    await this.loadMentorProfile();
  },
  methods: {
    async loadMentorProfile() {
      try {
        // TODO: Replace with actual API call
        // const response = await getMentorProfile(this.mentorId);
        // this.mentor = response.data;
        
        // Placeholder data for now
        this.mentor = {
          fullName: 'Dr. Sarah Johnson',
          professionalTitle: 'Senior Software Engineer',
          company: 'Google Australia',
          location: 'Sydney, Australia',
          bio: 'Experienced software engineer with 8+ years in the tech industry. Passionate about mentoring junior developers and helping them navigate their career paths. Specialized in full-stack development, cloud architecture, and team leadership.',
          avatar: '/default-avatar.svg',
          skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Team Leadership'],
          experience: '8+ years',
          degree: 'PhD in Computer Science',
          university: 'University of Sydney',
          graduationYear: '2015'
        };
      } catch (error) {
        console.error('Failed to load mentor profile:', error);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    showCalendar() {
      this.isCalendarVisible = true;
    },
    bookSelectedTime() {
      if (this.selectedDate && this.selectedTime) {
        // TODO: Implement actual booking logic
        alert(`Booking confirmed for ${this.selectedDate} at ${this.selectedTime}`);
        // Reset selections after booking
        this.selectedDate = '';
        this.selectedTime = '';
        this.isCalendarVisible = false;
      }
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
}

.book-session-btn:hover {
  background: #0056b3;
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
</style>