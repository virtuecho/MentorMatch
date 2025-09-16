<template>
  <div class="settings-content">
    <div class="settings-container">
      <h1 class="settings-title">Settings</h1>
      
      <div class="settings-card">
        <!-- Account Section -->
        <div class="settings-section">
          <h2 class="section-title">Account</h2>
          
          <!-- Email Field -->
          <div class="email-section">
            <label class="field-label">Email</label>
            <div class="email-input">
              <input 
                type="email" 
                v-model="userEmail"
                class="email-field"
                placeholder="Enter your email address"
              />
            </div>
          </div>
          
          <!-- Change Password Link -->
          <div class="password-section">
            <a href="#" class="change-password-link">Change Password</a>
          </div>
        </div>
        
        <div class="section-divider"></div>
        
        <!-- Mentor Mode Section -->
        <div class="settings-section">
          <h2 class="section-title">Mentor Mode</h2>
          
          <div class="mentor-mode-row">
            <div class="mentor-mode-info">
              <p class="mentor-mode-description whitespace-normal">
                Enable to manage and publish your sessions as a mentor. <br>
                Disable to view and book mentors as a mentee.
              </p>
              <p v-if="!isEligibleMentor" class="eligibility-hint">Your account is not verified as a mentor yet. Please complete mentor verification to enable this.</p>
              
              <!-- Mentor Verification Hint -->
              <div class="mentor-verification-hint">
                <p class="verification-text">
                  Not a mentor yet? 
                  <a href="#" @click.prevent="goToMentorVerification" class="verification-link">
                    Apply for verification
                  </a>
                </p>
              </div>
            </div>
            
            <div class="switch-container">
              <label class="switch">
                <input 
                  type="checkbox" 
                  v-model="mentorModeEnabled"
                  class="switch-input"
                  :disabled="!isEligibleMentor"
                  @change="onToggleMentorMode"
                />
                <span class="switch-slider" :class="{ disabled: !isEligibleMentor }"></span>
              </label>
            </div>
          </div>
        </div>
        
        <div class="section-divider"></div>
        
        <!-- Account Management Section -->
        <div class="settings-section">
          <h2 class="section-title">Account Management</h2>
          
          <div class="deactivate-section">
            <button class="deactivate-btn">
              Deactivate Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile } from '@/services/auth';
import { updateRole } from '@/services/role';

export default {
  name: 'SettingsContent',
  data() {
    return {
      mentorModeEnabled: false,
      userEmail: '',
      isEligibleMentor: false,
      serverRole: null,           // authoritative role from backend ('mentor'|'mentee')
      isToggling: false           // prevents concurrent toggle calls
    };
  },
  created() {
    const query = this.$route.query;

    const role = localStorage.getItem('userRole');
    this.userEmail = query.email;
    this.isEligibleMentor = query.isMentorApproved === 'true';
    this.serverRole = role;
    this.mentorModeEnabled = role === 'mentor'
  },

  methods: {
    async fetchProfileFallback() {
      try {
        const profile = await getProfile();
        const role = profile.data.role;

        this.userEmail = profile.data.email;
        this.isEligibleMentor = profile.data.isMentorApproved === 'true';
        this.serverRole = role;
        this.mentorModeEnabled = role === 'mentor';
        localStorage.setItem('userRole', role);
      } catch (err) {
        console.error('Failed to fetch profile on refresh:', err.response?.data || err.message);
      }
    },

    async onToggleMentorMode() {
      if (this.isToggling) { return; }

      const desiredMentor = !!this.mentorModeEnabled;
      const desiredRole = desiredMentor ? 'mentor' : 'mentee';

      if (desiredMentor && !this.isEligibleMentor) {
        this.$nextTick(() => { this.mentorModeEnabled = false; });
        return;
      }

      if (this.serverRole === desiredRole) return;

      this.isToggling = true;
      try {
        let res;
        try {
          res = await updateRole({ role: desiredRole });
        } catch {
          res = await updateRole(); // fallback
        }

        const updatedRole = res?.data?.role || desiredRole;

        this.serverRole = updatedRole;
        this.mentorModeEnabled = updatedRole === 'mentor';
        localStorage.setItem('userRole', updatedRole);

        const isOnBookings = ['/my-bookings', '/mentors-bookings'].includes(this.$route.path);
        const targetRoute = updatedRole === 'mentor' ? '/mentors-bookings' : '/my-bookings';
        if (isOnBookings && this.$route.path !== targetRoute) {
          this.$router.push(targetRoute);
        }

        console.log(`Role updated to ${updatedRole}`);
      } catch (err) {
        console.error('Failed to toggle role:', err.response?.data || err.message);
        this.mentorModeEnabled = this.serverRole === 'mentor';
      } finally {
        this.isToggling = false;
      }
    },
    goToMentorVerification() {
      this.$router.push('/mentor-verification');
    }
  }
};
</script>

<style scoped>
.settings-content {
  background: #eeeeee;
  min-height: calc(100vh - 64px);
  padding: 35px 0;
}

.settings-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 35px;
}

.settings-title {
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 1em;
  color: #000000;
  margin: 0 0 35px 4px;
}

.settings-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 47px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.settings-section {
  margin-bottom: 40px;
}

.settings-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #000000;
  margin: 0 0 24px 0;
}

.section-divider {
  height: 1px;
  background: #000000;
  margin: 40px 0;
  width: 100%;
  max-width: 788px;
}

/* Email Section */
.email-section {
  margin-bottom: 24px;
}

.field-label {
  display: block;
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #0d141c;
  margin-bottom: 8px;
}

.email-input {
  max-width: 400px;
}

.email-field {
  width: 100%;
  padding: 12px 16px;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-family: Inter, sans-serif;
  font-size: 14px;
  color: #374151;
  outline: none;
  transition: all 0.2s ease;
}

.email-field:hover {
  border-color: #9ca3af;
}

.email-field:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background: #ffffff;
}

.email-field::placeholder {
  color: #9ca3af;
}

.password-section {
  margin-top: 16px;
}

.change-password-link {
  font-family: Inter, sans-serif;
  font-size: 14px;
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.2s ease;
}

.change-password-link:hover {
  color: #2563eb;
  text-decoration: underline;
}

/* Mentor Mode Section */
.mentor-mode-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;
}

.mentor-mode-info {
  flex: 0 0 auto;
}

.mentor-mode-description {
  font-family: Inter, sans-serif;
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.eligibility-hint {
  margin-top: 8px;
  font-size: 12px;
  color: #ef4444;
}

/* Mentor Verification Hint */
.mentor-verification-hint {
  margin-top: 16px;
}

.verification-text {
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

.verification-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.verification-link:hover {
  color: #2563eb;
  text-decoration: underline;
}

/* Switch Styles */
.switch-container {
  flex-shrink: 0;
}

.switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 32px;
}

.switch-input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e5e7eb;
  transition: 0.3s;
  border-radius: 32px;
}

.switch-slider.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.switch-slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.switch-input:checked + .switch-slider {
  background-color: #3b82f6;
}

.switch-input:checked + 
.switch-slider:before {
  transform: translateX(20px);
}

.switch-slider:hover {
  box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.1);
}

/* Deactivate Section */
.deactivate-section {
  margin-top: 24px;
}

.deactivate-btn {
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 12px 24px;
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.deactivate-btn:hover {
  background: #dc2626;
}

/* Responsive Design */
@media (max-width: 768px) {
  .settings-container {
    padding: 0 20px;
  }
  
  .settings-card {
    padding: 24px;
  }
  
  .settings-title {
    font-size: 28px;
  }
  
  .mentor-mode-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .switch-container {
    align-self: flex-end;
  }
}

@media (max-width: 480px) {
  .settings-container {
    padding: 0 16px;
  }
  
  .settings-card {
    padding: 20px;
  }
  
  .settings-title {
    font-size: 24px;
  }
}
</style>