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
              <h2 class="user-name">{{ displayFullName }}</h2>
              <p class="user-location">{{ profile.location || '' }}</p>
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
                :placeholder="displayFullName || 'Enter your full name'"
                :disabled="!isEditMode"
              />
            </div>
          </div>
          
          <!-- Location Field -->
          <div class="form-field">
            <label class="field-label">Location</label>
            <div class="input-container">
              <input 
                type="text" 
                v-model="profile.location"
                class="form-input"
                placeholder="No location to show"
                :disabled="!isEditMode"
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
                placeholder="Tell us about yourself"
                :disabled="!isEditMode"
              ></textarea>
            </div>
          </div>
          

          
          <!-- Contact Information Section -->
          <div class="contact-section">
            <h3 class="section-title">Contact Information</h3>
            
            <!-- Social Media Field -->
            <div class="form-field">
              <label class="field-label">Social Media</label>
              
              <!-- Display: Icons with links (when not editing) -->
              <div v-if="!isEditMode" class="social-links">
                <a 
                  v-if="normalizedSocial.instagram"
                  :href="normalizedSocial.instagram"
                  class="social-link instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="5" stroke="#DB2777" stroke-width="1.8"/>
                    <circle cx="12" cy="12" r="4" stroke="#DB2777" stroke-width="1.8"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="#DB2777"/>
                  </svg>
                </a>
                <a 
                  v-if="normalizedSocial.facebook"
                  :href="normalizedSocial.facebook"
                  class="social-link facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#2563EB" stroke-width="1.8"/>
                    <path d="M13 10h2V8h-2c-1.1 0-2 .9-2 2v2H9v2h2v4h2v-4h2v-2h-2v-2c0-.55.45-1 1-1Z" fill="#2563EB"/>
                  </svg>
                </a>
                <a 
                  v-if="normalizedSocial.linkedin"
                  :href="normalizedSocial.linkedin"
                  class="social-link linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="3" stroke="#0EA5E9" stroke-width="1.8"/>
                    <circle cx="8" cy="10" r="2" fill="#0EA5E9"/>
                    <rect x="6.5" y="12" width="3" height="6.5" fill="#0EA5E9"/>
                    <path d="M12 12h2.5a3 3 0 0 1 3 3v3.5H14.5V15.5c0-.55-.45-1-1-1H12V12Z" fill="#0EA5E9"/>
                  </svg>
                </a>

                <p v-if="!normalizedSocial.instagram && !normalizedSocial.facebook && !normalizedSocial.linkedin" class="empty-social">
                  No social media provided.
                </p>
              </div>

              <!-- Edit: Inputs (when editing) -->
              <div v-else class="social-inputs">
                <div class="form-field">
                  <label class="field-label">Instagram</label>
                  <input 
                    type="url" 
                    v-model="profile.instagramUrl"
                    class="form-input"
                    placeholder="https://instagram.com/your_handle or @your_handle"
                  />
                </div>
                <div class="form-field">
                  <label class="field-label">Facebook</label>
                  <input 
                    type="url" 
                    v-model="profile.facebookUrl"
                    class="form-input"
                    placeholder="https://facebook.com/your.profile or your.profile"
                  />
                </div>
                <div class="form-field">
                  <label class="field-label">LinkedIn</label>
                  <input 
                    type="url" 
                    v-model="profile.linkedinUrl"
                    class="form-input"
                    placeholder="https://www.linkedin.com/in/your-profile or your-profile"
                  />
                </div>
                <p class="helper-text">
                  You can paste full URLs or usernames/handles; links will be normalized automatically.
                </p>
              </div>
            </div>
          </div>
          
          <!-- Education Section -->
          <div class="education-section">
            <div class="section-header">
              <h3 class="section-title">Education</h3>
              <div class="section-actions" v-if="isEditMode">
                <button class="edit-section-btn" @click="toggleEducationExpand" aria-label="Edit education">
                  <svg class="edit-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.5 2.5l3 3L12 15l-4 1 1-4L18.5 2.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button class="add-item-btn" v-if="isEducationExpanded" @click="addEducation" aria-label="Add education">
                  <svg class="plus-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5v14m-7-7h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
                    <p class="major-info" v-if="education.major">{{ education.major }}</p>
                    <p class="education-period">{{ formatYearRange(education.startYear, education.endYear) }}</p>
                  </div>
                </div>

              </div>
              
              <div v-else class="education-edit">
                <div class="form-field">
                  <label class="field-label">University</label>
                  <input 
                    type="text" 
                    v-model="education.university"
                    class="form-input"
                    placeholder="University name"
                    :disabled="!isEditMode"
                  />
                </div>
                <div class="form-field">
                  <label class="field-label">Degree</label>
                  <input 
                    type="text" 
                    v-model="education.degree"
                    class="form-input"
                    placeholder="Degree"
                    :disabled="!isEditMode"
                  />
                </div>
                <div class="form-field">
                  <label class="field-label">Major</label>
                  <input 
                    type="text" 
                    v-model="education.major"
                    class="form-input"
                    placeholder="Major"
                    :disabled="!isEditMode"
                  />
                </div>
                <div class="form-field">
                  <label class="field-label">Start Year</label>
                  <input
                    type="text"
                    v-model="education.startYear"
                    class="form-input"
                    placeholder="e.g., 2022"
                    :disabled="!isEditMode"
                  />
                </div>
                <div class="form-field">
                  <label class="field-label">End Year</label>
                  <input
                    type="text"
                    v-model="education.endYear"
                    class="form-input"
                    placeholder="Leave blank if ongoing"
                    :disabled="!isEditMode"
                  />
                </div>

                <button v-if="isEditMode" class="remove-item-btn" @click="removeEducation(index)">
                  Remove
                </button>
              </div>
            </div>
            
            <div v-if="profile.education.length === 0" class="empty-education">
              <p class="empty-text">No education added yet. Click + to add your first education.</p>
            </div>
          </div>
          
          <!-- Experience Section -->
          <div class="experience-section">
            <div class="section-header">
              <h3 class="section-title">Experience</h3>
              <div class="section-actions" v-if="isEditMode">
                <button class="edit-section-btn" @click="toggleExperienceExpand" aria-label="Edit experience">
                  <svg class="edit-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.5 2.5l3 3L12 15l-4 1 1-4L18.5 2.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button class="add-item-btn" v-if="isExperienceExpanded" @click="addExperience" aria-label="Add experience">
                  <svg class="plus-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5v14m-7-7h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div v-for="(experience, index) in profile.experience" :key="index" class="experience-item">
              <div v-if="!isEditingExperience" class="experience-display">
                <div class="experience-header">
                  <img :src="experience.logo || '/default-company-logo.svg'" alt="Company Logo" class="company-logo" />
                  <div class="experience-info">
                    <h4 class="company-name">{{ experience.company }}</h4>
                    <p class="position-info">{{ experience.position }}</p>
                    <p class="experience-period">{{ formatYearRange(experience.startYear, experience.endYear) }}</p>
                  </div>
                </div>
                <div v-if="experience.skills && experience.skills.length > 0" class="experience-skills">
                  <svg class="skills-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                  </svg>
                  <span class="skills-text">{{ experience.skills.length <= 2 ? experience.skills.join(', ') : experience.skills.slice(0, 2).join(', ') + ' and +' + (experience.skills.length - 2) + ' skills' }}</span>
                </div>
              </div>
              
              <div v-else class="experience-edit">
                <div class="form-field">
                  <label class="field-label">Company</label>
                  <input 
                    type="text" 
                    v-model="experience.company"
                    class="form-input"
                    placeholder="Company name"
                    :disabled="!isEditMode"
                  />
                </div>
                <div class="form-field">
                  <label class="field-label">Position</label>
                  <input 
                    type="text" 
                    v-model="experience.position"
                    class="form-input"
                    placeholder="Job title"
                    :disabled="!isEditMode"
                  />
                </div>
                <div class="form-field">
                  <label class="field-label">Start Year</label>
                  <input 
                    type="text" 
                    v-model="experience.startYear"
                    class="form-input"
                    placeholder="e.g., 2023"
                    :disabled="!isEditMode"
                  />
                </div>
                <div class="form-field">
                  <label class="field-label">End Year</label>
                  <input 
                    type="text" 
                    v-model="experience.endYear"
                    class="form-input"
                    placeholder="Leave blank if ongoing"
                    :disabled="!isEditMode"
                  />
                </div>
                <div class="form-field">
                  <label class="field-label">Skills</label>
                  <input 
                    type="text" 
                    v-model="experience.skillsString"
                    @input="updateExperienceSkills(index, experience.skillsString)"
                    class="form-input"
                    placeholder="JavaScript, React, Node.js"
                    :disabled="!isEditMode"
                  />
                </div>
                <button v-if="isEditMode" class="remove-item-btn" @click="removeExperience(index)">
                  Remove
                </button>
              </div>
            </div>
            
            <div v-if="profile.experience.length === 0" class="empty-experience">
              <p class="empty-text">No experience added yet. Click + to add your first experience.</p>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="button-group">
            <button v-if="!isEditMode" class="edit-btn" @click="enableEditMode">
              Edit profile
            </button>
            <template v-else>
              <button class="cancel-btn" @click="confirmCancelChanges">
                Cancel
              </button>
              <button class="save-btn" @click="saveProfile">
                Save Changes
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile, updateProfile } from '@/services/auth'

export default {
  name: 'ProfileContent',
  data() {
    return {
      isEditMode: false,
      profile: {
        fullName: '',
        location: 'No location to show',
        phone: '',
        socialMedia: '',
        instagramUrl: '',
        facebookUrl: '',
        linkedinUrl: '',
        bio: 'Tell us about yourself',
        avatar: null,
        education: [
          {
            university: 'University of Melbourne',
            degree: 'Bachelor of Science, Computer Software System',
            major: '',
            startYear: 2022,
            endYear: 2025,
            logo: null
          }
        ],
        experience: [
          {
            company: 'Tech Solutions Inc.',
            position: 'Software Engineer',
            startYear: 2023,
            endYear: null,
            skills: ['JavaScript', 'React', 'Node.js'],
            skillsString: 'JavaScript, React, Node.js',
            logo: null
          }
        ]
      },
      originalProfile: {},
      isEditingEducation: false,
      isEducationExpanded: false,
      isEditingExperience: false,
      isExperienceExpanded: false,
      userEmail: ''
    }
  },
  async mounted() {
    await this.loadUserProfile()
    // Store original values for cancel functionality
    this.originalProfile = JSON.parse(JSON.stringify(this.profile))
  },
  computed: {
    displayFullName() {
      const name = (this.profile && this.profile.fullName) ? this.profile.fullName.trim() : ''
      if (name) return name
      if (this.userEmail) {
        const prefix = this.userEmail.split('@')[0]
        return prefix
      }
      return ''
    },
    normalizedSocial() {
      const normalize = (service, raw) => {
        if (!raw) return ''
        let val = String(raw).trim()
        if (!val) return ''
        if (val.startsWith('@')) val = val.slice(1)
        const hasProtocol = /^https?:\/\//i.test(val)
        const hasDomain = /(instagram\.com|facebook\.com|linkedin\.com)/i.test(val)
        if (hasDomain) {
          return hasProtocol ? val : `https://${val}`
        }
        switch (service) {
          case 'instagram':
            return `https://instagram.com/${val.replace(/^\/+/, '')}`
          case 'facebook':
            return `https://facebook.com/${val.replace(/^\/+/, '')}`
          case 'linkedin':
            val = val.replace(/^in\//, '').replace(/^\/+/, '')
            return `https://www.linkedin.com/in/${val}`
          default:
            return ''
        }
      }
      return {
        instagram: normalize('instagram', this.profile.instagramUrl),
        facebook: normalize('facebook', this.profile.facebookUrl),
        linkedin: normalize('linkedin', this.profile.linkedinUrl)
      }
    }
  },
  methods: {
    async loadUserProfile() {
      try {
        // Try to get user profile from API
        const response = await getProfile()
        const userData = response.data
        
        this.userEmail = userData.email
        
        // Extract username from email (part before @)
        const emailPrefix = userData.email.split('@')[0]
        
        // Set fullName to email prefix if no fullName exists in profile
        if (userData.profile && userData.profile.fullName) {
          this.profile.fullName = userData.profile.fullName
        } else {
          this.profile.fullName = emailPrefix
        }
        
        // Load other profile data if available
        if (userData.profile) {
          this.profile.location = userData.profile.location || this.profile.location
          this.profile.instagramUrl = userData.profile.socialMedia || this.profile.socialMedia
          this.profile.facebookUrl = userData.profile.websiteUrl || this.profile.websiteUrl
          this.profile.linkedinUrl = userData.profile.linkedinUrl || this.profile.linkedinUrl
          this.profile.bio = userData.profile.bio || this.profile.bio
          this.profile.avatar = userData.profile.profileImageUrl || this.profile.avatar
          this.profile.education = (userData.profile.educations || []).map(edu => ({
            university: edu.university,
            degree: edu.degree,
            major: edu.major,
            startYear: edu.startYear,
            endYear: edu.endYear ?? null,
            logo: edu.logo || null
          }))
          this.profile.experience = (userData.profile.experience || []).map(exp => ({
            company: exp.company,
            position: exp.position,
            startYear: exp.startYear,
            endYear: exp.endYear ?? null,
            skills: exp.expertise || [],
            skillsString: (exp.expertise || []).join(', '),
            logo: exp.logo || null
          }))
        }
        
      } catch (error) {
        console.error('Failed to load user profile:', error)
        // Fallback: try to get email from route query or localStorage
        const routeEmail = this.$route && this.$route.query ? this.$route.query.email : null
        if (routeEmail) {
          this.userEmail = routeEmail
          this.profile.fullName = routeEmail.split('@')[0]
        } else {
          // Keep default values
          this.profile.fullName = 'John Doe'
        }
      }
    },
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
        major: '',
        startYear: '',
        endYear: '',
        logo: null
      })
      this.isEditingEducation = true
    },
    removeEducation(index) {
      this.profile.education.splice(index, 1)
    },
    toggleEducationExpand() {
      // Toggle section expand/collapse and sync editing state if present
      this.isEducationExpanded = !this.isEducationExpanded
      if (typeof this.isEditingEducation !== 'undefined') {
        this.isEditingEducation = this.isEducationExpanded
      }
    },
    toggleEducationEdit() {
      this.isEditingEducation = !this.isEditingEducation
    },
    addExperience() {
      this.profile.experience.push({
        company: '',
        position: '',
        startYear: '',
        endYear: '',
        skills: [],
        skillsString: '',
        logo: null
      })
      this.isEditingExperience = true
    },
    removeExperience(index) {
      this.profile.experience.splice(index, 1)
    },
    toggleExperienceEdit() {
      this.isEditingExperience = !this.isEditingExperience
    },
    toggleExperienceExpand() {
      // Toggle section expand/collapse and sync editing state if present
      this.isExperienceExpanded = !this.isExperienceExpanded
      if (typeof this.isEditingExperience !== 'undefined') {
        this.isEditingExperience = this.isExperienceExpanded
      }
    },
    updateExperienceSkills(index, skillsString) {
      const skills = skillsString.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0)
      this.profile.experience[index].skills = skills
      this.profile.experience[index].skillsString = skillsString
    },
    formatYearRange(startYear, endYear) {
      const s = String(startYear ?? '').trim()
      const e = String(endYear ?? '').trim()
      if (!s) return ''
      return e ? `${s} - ${e}` : `${s} - Present`
    },
    enableEditMode() {
      this.isEditMode = true
      // Store current profile state for potential cancellation
      this.originalProfile = JSON.parse(JSON.stringify(this.profile))
    },
    confirmCancelChanges() {
      if (confirm('Are you sure you want to cancel all changes? Any unsaved modifications will be lost.')) {
        this.cancelChanges()
      }
    },
    async saveProfile() {
      console.log('Saving profile:', this.profile)
      
      try {
        // Prepare payload for API
        const toIntOrNull = (val) => {
          if (val === null || val === undefined || val === '') return null
          const n = parseInt(val, 10)
          return Number.isFinite(n) ? n : null
        }
        const payload = {
          fullName: this.profile.fullName,
          location: this.profile.location,
          socialMedia: this.profile.socialMedia,
          instagramUrl: this.profile.instagramUrl,
          facebookUrl: this.profile.facebookUrl,
          linkedinUrl: this.profile.linkedinUrl,
          bio: this.profile.bio,
          profileImageUrl: this.profile.avatar,
          educations: this.profile.education.map(e => ({
            university: e.university,
            degree: e.degree,
            major: e.major,
            startYear: toIntOrNull(e.startYear),
            endYear: toIntOrNull(e.endYear),
            logo: e.logo
          })),
          experience: this.profile.experience.map(x => ({
            company: x.company,
            position: x.position,
            startYear: toIntOrNull(x.startYear),
            endYear: toIntOrNull(x.endYear),
            expertise: x.skills,
            logo: x.logo || null
          }))
        }
        
        // Call updateProfile API and wait for backend confirmation
        await updateProfile(payload)

        // Immediately reload from backend to ensure UI reflects persisted data
        await this.loadUserProfile()
        
        // Update original profile after successful save
        this.originalProfile = JSON.parse(JSON.stringify(this.profile))
        this.isEditingEducation = false
        this.isEditingExperience = false
        this.isEditMode = false
        
        // Show success message
        alert('Profile saved successfully!')
        
      } catch (error) {
        console.error('Failed to save profile:', error)
        alert('Failed to save profile. Please try again.')
      }
    },
    cancelChanges() {
      this.profile = JSON.parse(JSON.stringify(this.originalProfile))
      this.isEditingEducation = false
      this.isEditingExperience = false
      this.isEditMode = false
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

.user-location {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #6b7280;
  margin: 8px 0 0 0;
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

.section-actions .edit-icon {
  color: #6b7280;
}

.contact-section,
.education-section,
.experience-section {
  margin-top: 32px;
}

/* Experience Items */
.experience-item {
  margin-bottom: 20px;
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  padding: 20px;
  background: #fafbfc;
}

.experience-display {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.experience-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.company-logo {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.experience-info {
  flex: 1;
}

.company-name {
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.position-info {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #4b5563;
  margin: 0 0 4px 0;
}

.experience-period {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.experience-skills {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.experience-edit {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.empty-experience {
  text-align: center;
  padding: 40px 20px;
  color: #9ca3af;
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

.major-info {
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

.edit-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 14px;
}

.edit-btn:hover {
  background: #2563eb;
}

.form-input:disabled,
.form-textarea:disabled {
  background-color: #f9fafb;
  color: #6b7280;
  cursor: not-allowed;
  border-color: #e5e7eb;
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
/* Social links */
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

.social-link.instagram svg { }
.social-link.facebook svg { }
.social-link.linkedin svg { }

.empty-social {
  font-family: Inter, sans-serif;
  font-size: 14px;
  color: #9ca3af;
  margin: 4px 0 0 0;
}

.helper-text {
  font-size: 12px;
  color: #6b7280;
  margin-top: 8px;
}
</style>