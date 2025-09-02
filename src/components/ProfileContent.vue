<template>
  <div class="profile-content">
    <div class="profile-container">
      <h1 class="profile-title">My Profile</h1>
      
      <div class="profile-card">
        <!-- Left Side - Avatar Section -->
        <div class="profile-left">
          <div class="avatar-section">
            <div class="avatar-container">
              <img 
                :src="profile.avatar || '/default-avatar.svg'"
                alt="Profile Avatar"
                class="avatar-image"
              />
              <div class="avatar-overlay">
                <svg class="edit-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <input 
                type="file" 
                ref="fileInput"
                @change="handleAvatarUpload"
                accept="image/*"
                class="file-input"
              />
            </div>
            <div class="user-info">
              <h2 class="user-name">{{ profile.fullName || 'John Doe' }}</h2>
              <p class="user-title">{{ profile.professionalTitle || 'Software Engineer' }}</p>
            </div>
          </div>
        </div>
        
        <!-- Right Side - Form Fields -->
        <div class="profile-right">
          <!-- Full Name Field -->
          <div class="form-field">
            <label class="field-label">Full Name</label>
            <div class="input-container">
              <input 
                type="text" 
                v-model="profile.fullName"
                class="form-input"
                placeholder="John Doe"
              />
            </div>
          </div>
          
          <!-- Location Field -->
          <div class="form-field">
            <label class="field-label">Location / Timezone</label>
            <div class="input-container">
              <input 
                type="text" 
                v-model="profile.location"
                class="form-input"
                placeholder="Melbourne / AEST"
              />
            </div>
          </div>
        
          <!-- Professional Title Field -->
          <div class="form-field">
            <label class="field-label">Professional Title</label>
            <div class="input-container">
              <input 
                type="text" 
                v-model="profile.professionalTitle"
                class="form-input"
                placeholder="Software Engineer"
              />
            </div>
          </div>
          
          <!-- Company Field -->
          <div class="form-field">
            <label class="field-label">Company</label>
            <div class="input-container">
              <input 
                type="text" 
                v-model="profile.company"
                class="form-input"
                placeholder="Tech Solutions Inc."
              />
            </div>
          </div>
          
          <!-- Bio Field -->
          <div class="form-field">
            <label class="field-label">Bio / About Me</label>
            <div class="input-container">
              <textarea 
                v-model="profile.bio"
                class="form-textarea"
                rows="4"
                placeholder="Experience software engineer passionate about mentoring the next generation of tech talent. Skilled in web development."
              ></textarea>
            </div>
          </div>
          
          <!-- Areas of Expertise Field -->
          <div class="form-field">
            <label class="field-label">Areas of Expertise (Tags)</label>
            <div class="input-container">
              <input 
                type="text" 
                v-model="profile.expertise"
                class="form-input"
                placeholder="e.g., Javascript, UI/UX, Career Advice"
              />
            </div>

          </div>
          
          <!-- Contact Information Section -->
          <div class="contact-section">
            <h3 class="section-title">Contact Information</h3>
            
            <!-- Phone Field -->
            <div class="form-field">
              <label class="field-label">Phone</label>
              <div class="input-container">
                <input 
                  type="tel" 
                  v-model="profile.phone"
                  class="form-input"
                  placeholder="000-000-0000"
                />
              </div>
            </div>
            
            <!-- Social Media Field -->
            <div class="form-field">
              <label class="field-label">Social Media</label>
              <div class="input-container">
                <input 
                  type="text" 
                  v-model="profile.socialMedia"
                  class="form-input"
                  placeholder="@"
                />
              </div>
            </div>
          </div>
          
          <!-- Education Section -->
          <div class="education-section">
            <div class="section-header">
              <h3 class="section-title">Education</h3>
              <div class="section-actions">
                <button class="add-item-btn" @click="addEducation">
                  <svg class="plus-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5v14m-7-7h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button class="edit-section-btn" @click="toggleEducationEdit">
                  <svg class="edit-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div v-for="(education, index) in profile.education" :key="index" class="education-item">
              <div v-if="!isEditingEducation" class="education-display">
                <div class="education-header">
                  <img :src="education.logo || '/default-university-logo.svg'" alt="University Logo" class="university-logo" />
                  <div class="education-info">
                    <h4 class="university-name">{{ education.university }}</h4>
                    <p class="degree-info">{{ education.degree }}</p>
                    <p class="education-period">{{ education.period }}</p>
                  </div>
                </div>
                <div v-if="education.skills && education.skills.length > 0" class="education-skills">
                  <svg class="skills-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                  </svg>
                  <span class="skills-text">{{ education.skills.length <= 2 ? education.skills.join(', ') : education.skills.slice(0, 2).join(', ') + ' and +' + (education.skills.length - 2) + ' skills' }}</span>
                </div>
              </div>
              
              <div v-else class="education-edit">
                <div class="form-field">
                  <label class="field-label">University</label>
                  <input 
                    type="text" 
                    v-model="education.university"
                    class="form-input"
                    placeholder="University of Melbourne"
                  />
                </div>
                <div class="form-field">
                  <label class="field-label">Degree</label>
                  <input 
                    type="text" 
                    v-model="education.degree"
                    class="form-input"
                    placeholder="Bachelor of Science, Computer Software System"
                  />
                </div>
                <div class="form-field">
                  <label class="field-label">Period</label>
                  <input 
                    type="text" 
                    v-model="education.period"
                    class="form-input"
                    placeholder="Feb 2022 - Nov 2025"
                  />
                </div>
                <div class="form-field">
                  <label class="field-label">Skills (comma separated)</label>
                  <input 
                    type="text" 
                    v-model="education.skillsString"
                    @input="updateEducationSkills(index, education.skillsString)"
                    class="form-input"
                    placeholder="C, JavaScript, Python"
                  />
                </div>
                <button class="remove-item-btn" @click="removeEducation(index)">
                  Remove
                </button>
              </div>
            </div>
            
            <div v-if="profile.education.length === 0" class="empty-education">
              <p class="empty-text">No education added yet. Click + to add your first education.</p>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="button-group">
            <button class="cancel-btn" @click="cancelChanges">
              Cancel
            </button>
            <button class="save-btn" @click="saveProfile">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileContent',
  data() {
    return {
      profile: {
        fullName: 'John Doe',
        location: 'Melbourne / AEST',
        company: 'Tech Solutions Inc.',
        professionalTitle: 'Software Engineer',
        phone: '000-000-0000',
        socialMedia: '@',
        bio: 'Experience software engineer passionate about mentoring the next generation of tech talent. Skilled in web development.',
        expertise: '',
        avatar: null,
        education: [
          {
            university: 'University of Melbourne',
            degree: 'Bachelor of Science, Computer Software System',
            period: 'Feb 2022 - Nov 2025',
            skills: ['C', 'JavaScript'],
            skillsString: 'C, JavaScript',
            logo: null
          }
        ]
      },
      originalProfile: {},
      isEditingEducation: false
    }
  },
  mounted() {
    // Store original values for cancel functionality
    this.originalProfile = { ...this.profile }
  },
  methods: {
    handleAvatarUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.profile.avatar = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    addEducation() {
      this.profile.education.push({
        university: '',
        degree: '',
        period: '',
        skills: [],
        skillsString: '',
        logo: null
      })
      this.isEditingEducation = true
    },
    removeEducation(index) {
      this.profile.education.splice(index, 1)
    },
    toggleEducationEdit() {
      this.isEditingEducation = !this.isEditingEducation
    },
    updateEducationSkills(index, skillsString) {
      const skills = skillsString.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0)
      this.profile.education[index].skills = skills
      this.profile.education[index].skillsString = skillsString
    },
    saveProfile() {
      console.log('Saving profile:', this.profile)
      // Here you would typically make an API call to save the profile
      this.originalProfile = { ...this.profile }
      this.isEditingEducation = false
      // Show success message
      alert('Profile saved successfully!')
    },
    cancelChanges() {
      this.profile = { ...this.originalProfile }
      this.isEditingEducation = false
      console.log('Changes cancelled')
    }
  }
}
</script>

<style scoped>
.profile-content {
  background: #f8fafc;
  min-height: calc(100vh - 64px);
  padding: 20px 0;
}

.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.profile-title {
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: #1f2937;
  margin: 0 0 32px 0;
  text-align: left;
}

.profile-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  display: flex;
  gap: 0;
  min-height: 600px;
}

/* Left Side - Avatar Section */
.profile-left {
  flex: 0 0 300px;
  background: #ffffff;
  border-radius: 12px 0 0 12px;
  padding: 40px 30px;
  border-right: 1px solid #f3f4f6;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.avatar-container {
  position: relative;
  margin-bottom: 24px;
  cursor: pointer;
}

.avatar-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e5e7eb;
  transition: all 0.2s ease;
}

.avatar-container:hover .avatar-image {
  border-color: #3b82f6;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.avatar-container:hover .avatar-overlay {
  opacity: 1;
}

.edit-icon {
  width: 24px;
  height: 24px;
  color: white;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.user-info {
  text-align: center;
}

.user-name {
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.user-title {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

/* Right Side - Form Fields */
.profile-right {
  flex: 1;
  padding: 40px;
  background: #ffffff;
  border-radius: 0 12px 12px 0;
}

.form-field {
  margin-bottom: 28px;
}

.field-label {
  display: block;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: #1f2937;
  margin-bottom: 12px;
  letter-spacing: -0.01em;
}

.input-container {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 16px 20px;
  font-family: Inter, sans-serif;
  font-size: 15px;
  color: #1f2937;
  background: #ffffff;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.2s ease;
  box-sizing: border-box;
  line-height: 1.4;
}

.form-input:hover {
  border-color: #d1d5db;
  background: #fafbfc;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.08);
  background: #ffffff;
}

.form-input::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

.form-textarea {
  width: 100%;
  padding: 16px 20px;
  font-family: Inter, sans-serif;
  font-size: 15px;
  color: #1f2937;
  background: #ffffff;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.2s ease;
  box-sizing: border-box;
  resize: vertical;
  min-height: 120px;
  line-height: 1.5;
}

.form-textarea:hover {
  border-color: #d1d5db;
  background: #fafbfc;
}

.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.08);
  background: #ffffff;
}

.form-textarea::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

/* Tags */
.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.tag {
  background: #3b82f6;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  font-family: Inter, sans-serif;
}

/* Section Titles */
.section-title {
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #1f2937;
  margin: 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 32px 0 20px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #f3f4f6;
}

.section-actions {
  display: flex;
  gap: 8px;
}

.contact-section,
.education-section {
  margin-top: 32px;
}

/* Education Items */
.education-item {
  margin-bottom: 20px;
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  padding: 20px;
  background: #fafbfc;
}

.education-display {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.education-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.university-logo {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.education-info {
  flex: 1;
}

.university-name {
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.degree-info {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #4b5563;
  margin: 0 0 4px 0;
}

.education-period {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.education-skills {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.skills-icon {
  width: 16px;
  height: 16px;
  color: #6b7280;
  flex-shrink: 0;
}

.skills-text {
  font-family: Inter, sans-serif;
  font-size: 14px;
  color: #6b7280;
}

.education-edit {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.empty-education {
  text-align: center;
  padding: 40px 20px;
  color: #9ca3af;
}

.empty-text {
  font-family: Inter, sans-serif;
  font-size: 14px;
  margin: 0;
}

.add-item-btn {
  background: #f3f4f6;
  color: #6b7280;
  border: none;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-item-btn:hover {
  background: #e5e7eb;
  color: #374151;
}

.edit-section-btn {
  background: #f3f4f6;
  color: #6b7280;
  border: none;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-section-btn:hover {
  background: #e5e7eb;
  color: #374151;
}

.plus-icon,
.edit-icon {
  width: 16px;
  height: 16px;
}

.remove-item-btn {
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;
}

.remove-item-btn:hover {
  background: #fecaca;
  color: #b91c1c;
}

.button-group {
  display: flex;
  gap: 16px;
  margin-top: 40px;
  justify-content: flex-end;
}

.save-btn {
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: -0.01em;
  min-width: 140px;
}

.save-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.25);
}

.save-btn:active {
  transform: translateY(0);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
}

.cancel-btn {
  background: #ffffff;
  color: #6b7280;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px 32px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: -0.01em;
  min-width: 140px;
}

.cancel-btn:hover {
  background: #f9fafb;
  border-color: #d1d5db;
  color: #374151;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.cancel-btn:active {
  background: #f3f4f6;
  transform: translateY(0);
}

/* Responsive Design */
/* Large Desktop */
@media (min-width: 1200px) {
  .profile-container {
    max-width: 1400px;
    padding: 40px;
  }
  
  .profile-left {
    flex: 0 0 350px;
    padding: 50px 40px;
  }
  
  .profile-right {
    padding: 50px;
  }
  
  .avatar-image {
    width: 140px;
    height: 140px;
  }
}

/* Medium Desktop */
@media (min-width: 992px) and (max-width: 1199px) {
  .profile-container {
    max-width: 1000px;
    padding: 30px;
  }
  
  .profile-left {
    flex: 0 0 280px;
    padding: 40px 25px;
  }
  
  .profile-right {
    padding: 40px 35px;
  }
}

/* Tablet Landscape */
@media (min-width: 769px) and (max-width: 991px) {
  .profile-container {
    max-width: 800px;
    padding: 20px;
  }
  
  .profile-left {
    flex: 0 0 250px;
    padding: 30px 20px;
  }
  
  .profile-right {
    padding: 30px;
  }
  
  .avatar-image {
    width: 100px;
    height: 100px;
  }
  
  .user-name {
    font-size: 20px;
  }
}

/* Tablet Portrait and Mobile */
@media (max-width: 768px) {
  .profile-card {
    flex-direction: column;
    min-height: auto;
  }
  
  .profile-left {
    flex: none;
    border-radius: 12px 12px 0 0;
    border-right: none;
    border-bottom: 1px solid #f3f4f6;
    padding: 30px 20px;
  }
  
  .profile-right {
    border-radius: 0 0 12px 12px;
    padding: 30px 20px;
  }
  
  .profile-title {
    font-size: 28px;
    margin-bottom: 24px;
  }
  
  .avatar-image {
    width: 100px;
    height: 100px;
  }
  
  .user-name {
    font-size: 20px;
  }
  
  .button-group {
    flex-direction: column;
    gap: 12px;
  }
  
  .save-btn,
  .cancel-btn {
    width: 100%;
    justify-content: center;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .profile-content {
    padding: 15px 0;
  }
  
  .profile-container {
    padding: 15px;
  }
  
  .profile-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .profile-left {
    padding: 25px 15px;
  }
  
  .profile-right {
    padding: 25px 15px;
  }
  
  .avatar-image {
    width: 80px;
    height: 80px;
  }
  
  .user-name {
    font-size: 18px;
  }
  
  .user-title {
    font-size: 14px;
  }
  
  .form-field {
    margin-bottom: 20px;
  }
  
  .section-title {
    font-size: 16px;
    margin: 24px 0 16px 0;
  }
}
</style>