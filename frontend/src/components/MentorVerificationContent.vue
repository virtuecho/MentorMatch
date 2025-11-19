<template>
  <div class="mentor-verification-content">
    <div class="verification-container">
      <!-- Header Section -->
      <div class="verification-header">
        <button @click="goBack" class="back-button">
          <svg class="back-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Back to Settings
      </button>
      <h1 class="verification-title">Mentor Verification</h1>
      <p class="verification-subtitle">Please fill out the following information to complete mentor verification</p>
      </div>

      <!-- Verification Form -->
      <div class="verification-form-container">
        <form @submit.prevent="submitVerification" class="verification-form">
          <!-- Personal Information Section -->
          <div class="form-section">
            <h3 class="section-title">Personal Information</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label for="fullName" class="form-label">Full Name *</label>
                <input 
                  id="fullName"
                  type="text" 
                  v-model="formData.fullName" 
                  class="form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="phone" class="form-label">Phone Number *</label>
                <input 
                  id="phone"
                  type="tel" 
                  v-model="formData.phone" 
                  class="form-input"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="linkedinUrl" class="form-label">LinkedIn Profile URL</label>
              <input 
                id="linkedinUrl"
                type="url" 
                v-model="formData.linkedinUrl" 
                class="form-input"
                placeholder="https://www.linkedin.com/in/your-profile"
              />
            </div>
          </div>

          <!-- Professional Information Section -->
          <div class="form-section">
            <h3 class="section-title">Professional Information</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label for="currentTitle" class="form-label">Current Position *</label>
                <input 
                  id="currentTitle"
                  type="text" 
                  v-model="formData.currentTitle" 
                  class="form-input"
                  placeholder="e.g., Senior Software Engineer"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="company" class="form-label">Current Company *</label>
                <input 
                  id="company"
                  type="text" 
                  v-model="formData.company" 
                  class="form-input"
                  placeholder="Enter your current company"
                  required
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="experience" class="form-label">Work Experience *</label>
                <select 
                  id="experience"
                  v-model="formData.experience" 
                  class="form-select"
                  required
                >
                  <option value="">Select work experience</option>
                  <option value="1-2">1-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="industry" class="form-label">Industry *</label>
                <select 
                  id="industry"
                  v-model="formData.industry" 
                  class="form-select"
                  required
                >
                  <option value="">Select industry</option>
                  <option value="technology">Technology/Internet</option>
                  <option value="finance">Finance</option>
                  <option value="consulting">Consulting</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="expertise" class="form-label">Professional Skills *</label>
              <div class="expertise-tags">
                <div 
                  v-for="skill in availableSkills" 
                  :key="skill"
                  class="skill-tag"
                  :class="{ active: formData.expertise.includes(skill) }"
                  @click="toggleSkill(skill)"
                >
                  {{ skill }}
                </div>
              </div>
              <p class="form-hint">Please select your professional skill areas (multiple selections allowed)</p>
            </div>
          </div>

          <!-- Education Section -->
          <div class="form-section">
            <h3 class="section-title">Educational Background</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label for="university" class="form-label">University</label>
                <input 
                  id="university"
                  type="text" 
                  v-model="formData.university" 
                  class="form-input"
                  placeholder="Enter your university"
                />
              </div>
              
              <div class="form-group">
                <label for="degree" class="form-label">Degree</label>
                <select 
                  id="degree"
                  v-model="formData.degree" 
                  class="form-select"
                >
                  <option value="">Select degree</option>
                  <option value="bachelor">Bachelor's</option>
                  <option value="master">Master's</option>
                  <option value="phd">PhD</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="major" class="form-label">Major</label>
              <input 
                id="major"
                type="text" 
                v-model="formData.major" 
                class="form-input"
                placeholder="Enter your major"
              />
            </div>
          </div>

          <!-- Mentoring Information Section -->
          <div class="form-section">
            <h3 class="section-title">Mentoring Information</h3>
            
            <div class="form-group">
              <label for="bio" class="form-label">Personal Bio *</label>
              <textarea 
                id="bio"
                v-model="formData.bio" 
                class="form-textarea"
                placeholder="Please briefly introduce your background, experience and how you can help mentees..."
                rows="4"
                required
              ></textarea>
              <p class="form-hint">Recommended 200-500 words</p>
            </div>

            <div class="form-group">
              <label for="mentorshipAreas" class="form-label">Mentorship Areas *</label>
              <div class="mentorship-areas">
                <div 
                  v-for="area in availableMentorshipAreas" 
                  :key="area"
                  class="area-tag"
                  :class="{ active: formData.mentorshipAreas.includes(area) }"
                  @click="toggleMentorshipArea(area)"
                >
                  {{ area }}
                </div>
              </div>
              <p class="form-hint">Please select areas you can provide mentorship in (multiple selections allowed)</p>
            </div>
          </div>

          <!-- Document Upload Section -->
          <div class="form-section">
            <h3 class="section-title">Supporting Documents</h3>
            
            <div class="upload-section">
              <div class="upload-item">
                <label class="upload-label">Identity Document</label>
                <div class="upload-area" @click="triggerFileUpload('identity')">
                  <svg class="upload-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <polyline points="7,10 12,15 17,10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <p class="upload-text">
                    <span v-if="!formData.identityDocument">Click to upload identity document</span>
                    <span v-else>{{ formData.identityDocument.name }}</span>
                  </p>
                  <p class="upload-hint">Supports PDF, JPG, PNG formats, max 5MB</p>
                </div>
                <input 
                  ref="identityFileInput"
                  type="file" 
                  accept=".pdf,.jpg,.jpeg,.png"
                  @change="handleFileUpload($event, 'identity')"
                  style="display: none;"
                />
              </div>

              <div class="upload-item">
                <label class="upload-label">Work Verification Document (Optional)</label>
                <div class="upload-area" @click="triggerFileUpload('work')">
                  <svg class="upload-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <polyline points="7,10 12,15 17,10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <p class="upload-text">
                    <span v-if="!formData.workDocument">Click to upload work verification</span>
                    <span v-else>{{ formData.workDocument.name }}</span>
                  </p>
                  <p class="upload-hint">Employment certificate, work ID, etc. Supports PDF, JPG, PNG formats</p>
                </div>
                <input 
                  ref="workFileInput"
                  type="file" 
                  accept=".pdf,.jpg,.jpeg,.png"
                  @change="handleFileUpload($event, 'work')"
                  style="display: none;"
                />
              </div>
            </div>
          </div>

          <!-- Submit Section -->
          <div class="submit-section">
            <div class="terms-agreement">
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  v-model="formData.agreeToTerms" 
                  class="checkbox-input"
                  required
                />
                <span class="checkbox-custom"></span>
                <span class="checkbox-text">
                  I agree to the <a href="#" class="terms-link">Terms of Service</a> and <a href="#" class="terms-link">Privacy Policy</a>
                </span>
              </label>
            </div>

            <button 
              type="submit" 
              class="submit-button"
              :disabled="isSubmitting || !isFormValid"
            >
              <span v-if="!isSubmitting">Submit Verification Application</span>
              <span v-else class="loading-text">
                <svg class="loading-spinner" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"/>
                  <path d="M4 12a8 8 0 0 1 8-8V2.5" stroke="currentColor" stroke-width="4" stroke-linecap="round" fill="none"/>
                </svg>
                Submitting...
              </span>
            </button>

            <p class="submit-note">
              After submission, we will review your application within 1-3 business days. The review result will be sent to you via email.
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MentorVerificationContent',
  data() {
    return {
      isSubmitting: false,
      formData: {
        fullName: '',
        phone: '',
        linkedinUrl: '',
        currentTitle: '',
        company: '',
        experience: '',
        industry: '',
        expertise: [],
        university: '',
        degree: '',
        major: '',
        bio: '',
        mentorshipAreas: [],
        identityDocument: null,
        workDocument: null,
        agreeToTerms: false
      },
      availableSkills: [
        'JavaScript', 'Python', 'Java', 'React', 'Vue.js', 'Node.js',
        'Data Analysis', 'Machine Learning', 'Product Management', 'Project Management', 'UI/UX Design',
        'Marketing', 'Business Analysis', 'Entrepreneurship', 'Career Planning', 'Interview Skills'
      ],
      availableMentorshipAreas: [
        'Technical Guidance', 'Career Planning', 'Interview Preparation', 'Resume Optimization', 'Skill Development',
        'Startup Consulting', 'Industry Insights', 'Networking', 'Leadership Development', 'Work-Life Balance'
      ]
    }
  },
  computed: {
    isFormValid() {
      return this.formData.fullName && 
             this.formData.phone && 
             this.formData.currentTitle && 
             this.formData.company && 
             this.formData.experience && 
             this.formData.industry && 
             this.formData.expertise.length > 0 && 
             this.formData.bio && 
             this.formData.mentorshipAreas.length > 0 && 
             this.formData.agreeToTerms
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    toggleSkill(skill) {
      const index = this.formData.expertise.indexOf(skill)
      if (index > -1) {
        this.formData.expertise.splice(index, 1)
      } else {
        this.formData.expertise.push(skill)
      }
    },
    toggleMentorshipArea(area) {
      const index = this.formData.mentorshipAreas.indexOf(area)
      if (index > -1) {
        this.formData.mentorshipAreas.splice(index, 1)
      } else {
        this.formData.mentorshipAreas.push(area)
      }
    },
    triggerFileUpload(type) {
      if (type === 'identity') {
        this.$refs.identityFileInput.click()
      } else if (type === 'work') {
        this.$refs.workFileInput.click()
      }
    },
    handleFileUpload(event, type) {
      const file = event.target.files[0]
      if (file) {
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          alert('File size cannot exceed 5MB')
          return
        }
        
        // Validate file type
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
        if (!allowedTypes.includes(file.type)) {
          alert('Only PDF, JPG, PNG format files are supported')
          return
        }
        
        if (type === 'identity') {
          this.formData.identityDocument = file
        } else if (type === 'work') {
          this.formData.workDocument = file
        }
      }
    },
    async submitVerification() {
      if (!this.isFormValid) {
        alert('Please fill in all required fields')
        return
      }
      
      this.isSubmitting = true
      
      try {
        // TODO: Replace with actual API call
        const formDataToSubmit = new FormData()
        
        // Add text fields
        Object.keys(this.formData).forEach(key => {
          if (key !== 'identityDocument' && key !== 'workDocument') {
            if (Array.isArray(this.formData[key])) {
              formDataToSubmit.append(key, JSON.stringify(this.formData[key]))
            } else {
              formDataToSubmit.append(key, this.formData[key])
            }
          }
        })
        
        // Add files
        if (this.formData.identityDocument) {
          formDataToSubmit.append('identityDocument', this.formData.identityDocument)
        }
        if (this.formData.workDocument) {
          formDataToSubmit.append('workDocument', this.formData.workDocument)
        }
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // TODO: Implement actual API call
        // const response = await fetch('/api/mentor-verification', {
        //   method: 'POST',
        //   body: formDataToSubmit,
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        //   }
        // })
        
        alert('Verification application submitted successfully! We will review your application within 1-3 business days.')
        this.$router.push('/settings')
        
      } catch (error) {
        console.error('Failed to submit verification application:', error)
        alert('Submission failed, please try again later')
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>

<style scoped>
.mentor-verification-content {
  min-height: 100vh;
  background: #f8fafc;
  padding: 24px 0;
}

.verification-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Header Styles */
.verification-header {
  text-align: left;
  margin-bottom: 40px;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #6b7280;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 24px;
  padding: 8px 0;
  transition: color 0.2s ease;
}

.back-button:hover {
  color: #374151;
}

.back-icon {
  width: 20px;
  height: 20px;
}

.verification-title {
  font-family: Inter, sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 12px 0;
}

.verification-subtitle {
  font-family: Inter, sans-serif;
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

/* Form Container */
.verification-form-container {
  background: #ffffff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Form Sections */
.form-section {
  margin-bottom: 40px;
}

.form-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-family: Inter, sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 24px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #e5e7eb;
}

/* Form Layout */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

.form-input,
.form-select {
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-family: Inter, sans-serif;
  font-size: 14px;
  color: #111827;
  background: #ffffff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-family: Inter, sans-serif;
  font-size: 14px;
  color: #111827;
  background: #ffffff;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-hint {
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
  margin-bottom: 0;
}

/* Tag Styles */
.expertise-tags,
.mentorship-areas {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.skill-tag,
.area-tag {
  padding: 8px 16px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.skill-tag:hover,
.area-tag:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
}

.skill-tag.active,
.area-tag.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: #ffffff;
}

/* Upload Styles */
.upload-section {
  display: grid;
  gap: 24px;
}

.upload-item {
  display: flex;
  flex-direction: column;
}

.upload-label {
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #fafafa;
}

.upload-area:hover {
  border-color: #3b82f6;
  background: #f8fafc;
}

.upload-icon {
  width: 32px;
  height: 32px;
  color: #6b7280;
  margin: 0 auto 12px;
}

.upload-text {
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin: 0 0 4px 0;
}

.upload-hint {
  font-size: 12px;
  color: #6b7280;
  margin: 0;
}

/* Submit Section */
.submit-section {
  margin-top: 40px;
  padding-top: 32px;
  border-top: 1px solid #e5e7eb;
}

.terms-agreement {
  margin-bottom: 24px;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  background: #ffffff;
  flex-shrink: 0;
  position: relative;
  transition: all 0.2s ease;
}

.checkbox-input:checked + .checkbox-custom {
  background: #3b82f6;
  border-color: #3b82f6;
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 6px;
  width: 6px;
  height: 10px;
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-text {
  flex: 1;
}

.terms-link {
  color: #3b82f6;
  text-decoration: none;
}

.terms-link:hover {
  text-decoration: underline;
}

.submit-button {
  width: 100%;
  padding: 16px 24px;
  background: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.submit-button:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.submit-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.submit-note {
  font-size: 14px;
  color: #6b7280;
  text-align: center;
  margin: 16px 0 0 0;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 768px) {
  .verification-container {
    padding: 0 16px;
  }
  
  .verification-form-container {
    padding: 24px;
  }
  
  .verification-header {
    text-align: left;
  }
  
  .verification-title {
    font-size: 28px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .expertise-tags,
  .mentorship-areas {
    gap: 6px;
  }
  
  .skill-tag,
  .area-tag {
    padding: 6px 12px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .verification-container {
    padding: 0 12px;
  }
  
  .verification-form-container {
    padding: 20px;
  }
  
  .verification-header {
    text-align: left;
  }
  
  .verification-title {
    font-size: 24px;
  }
  
  .section-title {
    font-size: 18px;
  }
  
  .upload-area {
    padding: 24px 16px;
  }
}
</style>