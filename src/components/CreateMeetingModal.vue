<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">Create New Meeting</h2>
        <button class="close-btn" @click="closeModal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="modal-body">
        <form @submit.prevent="submitMeeting" class="meeting-form">


          <!-- Date and Time -->
          <div class="form-row">
            <div class="form-group">
              <label for="meetingDate" class="form-label">Date *</label>
              <input
                id="meetingDate"
                v-model="formData.date"
                type="date"
                class="form-input"
                :min="minDate"
                required
              />
            </div>
            <div class="form-group">
              <label for="meetingTime" class="form-label">Time *</label>
              <select
                id="meetingTime"
                v-model="formData.time"
                class="form-select"
                required
              >
                <option value="">Select time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
              </select>
            </div>
          </div>

          <!-- Duration -->
          <div class="form-group">
            <label for="duration" class="form-label">Duration *</label>
            <select id="duration" v-model="formData.duration" class="form-select" required>
              <option value="">Select duration</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
            </select>
          </div>

          <!-- City -->
          <div class="form-group">
            <label for="city" class="form-label">City *</label>
            <select
              id="city"
              v-model="formData.city"
              class="form-select"
              required
            >
              <option value="">Select city</option>
              <option value="sydney">Sydney</option>
              <option value="melbourne">Melbourne</option>
              <option value="brisbane">Brisbane</option>
              <option value="perth">Perth</option>
              <option value="adelaide">Adelaide</option>
            </select>
          </div>

          <!-- Address -->
          <div class="form-group">
            <label for="address" class="form-label">Full Address *</label>
            <textarea
              id="address"
              v-model="formData.address"
              class="form-textarea"
              placeholder="Enter complete address with street, city, and postal code"
              rows="3"
              required
            ></textarea>
          </div>



          <!-- Max Participants -->
          <div class="form-group">
            <label for="maxParticipants" class="form-label">Maximum Participants *</label>
            <select id="maxParticipants" v-model="formData.maxParticipants" class="form-select" required>
              <option value="">Select max participants</option>
              <option value="1">1 person (1-on-1)</option>
              <option value="2">2 people</option>
              <option value="3">3 people</option>
              <option value="4">4 people</option>
              <option value="5">5 people</option>
            </select>
          </div>

          <!-- Additional Notes -->
          <div class="form-group">
            <label for="notes" class="form-label">Additional Notes</label>
            <textarea
              id="notes"
              v-model="formData.notes"
              class="form-textarea"
              placeholder="Any special instructions or requirements (optional)"
              rows="3"
            ></textarea>
          </div>

          <!-- Form Actions -->
          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="closeModal">
              Cancel
            </button>
            <button type="submit" class="submit-btn" :disabled="isSubmitting || !isFormValid">
              <span v-if="!isSubmitting">Create Meeting</span>
              <span v-else>Creating...</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { createAvailability } from '@/services/availability';

export default {
  name: 'CreateMeetingModal',
  data() {
    return {
      isSubmitting: false,
      formData: {
        date: '',
        time: '',
        duration: '',
        city: '',
        address: '',
        maxParticipants: '',
        notes: ''
      }
    }
  },
  computed: {
    minDate() {
      const today = new Date()
      return today.toISOString().split('T')[0]
    },
    isFormValid() {
      return this.formData.date &&
             this.formData.time &&
             this.formData.duration &&
             this.formData.city &&
             this.formData.address
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    async submitMeeting() {
      if (!this.isFormValid) {
        alert('Please fill in all required fields')
        return
      }

      this.isSubmitting = true

      try {
        // Build ISO startTime from date + time
        const startTime = new Date(
          `${this.formData.date}T${this.formData.time}`
        ).toISOString();

        const payload = {
          startTime,
          durationMins: Number(this.formData.duration),
          city: this.formData.city,
          address: this.formData.address,
          maxParticipants: this.formData.maxParticipants || 1
        };

        if (this.formData.notes) {
          payload.note = this.formData.notes;
        }

        const res = await createAvailability(payload);

        alert('Slot created successfully!');
        this.$emit('availability-created', res.data);
        this.closeModal()

      } catch (error) {
        console.error('Failed to create meeting:', error)
        alert('Failed to create meeting. Please try again.')
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>

<style scoped>
/* Modal Overlay */
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
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Modal Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0 24px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
}

.modal-title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.2s;
}

.close-btn:hover {
  color: #374151;
  background-color: #f3f4f6;
}

/* Modal Body */
.modal-body {
  padding: 0 24px 24px 24px;
}

.meeting-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Form Groups */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.form-input,
.form-select,
.form-textarea {
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #111827;
  background-color: white;
  transition: all 0.2s;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.cancel-btn {
  padding: 12px 24px;
  border: 1px solid #d1d5db;
  background-color: white;
  color: #374151;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.submit-btn {
  padding: 12px 24px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 140px;
}

.submit-btn:hover:not(:disabled) {
  background-color: #2563eb;
}

.submit-btn:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 10px;
  }
  
  .modal-content {
    max-height: 95vh;
  }
  
  .modal-header,
  .modal-body {
    padding-left: 16px;
    padding-right: 16px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .form-actions {
    flex-direction: column-reverse;
  }
  
  .cancel-btn,
  .submit-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .modal-title {
    font-size: 20px;
  }
  
  .modal-header,
  .modal-body {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>