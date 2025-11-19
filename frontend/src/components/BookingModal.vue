<template>
    <div class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Request a Booking</h3>
                <button class="close-btn" @click="$emit('close')">&times;</button>
            </div>
            <div class="modal-body">
                <!-- Session Details -->
                <p class="session-details">
                    You are booking a session with <strong>{{ mentorName }}</strong> on 
                    <strong>{{ formatDate(slot.startTime) }}</strong> from 
                    <strong>{{ formatTime(slot.startTime) }}</strong> to 
                    <strong>{{ formatEndTime(slot.startTime, slot.durationMins) }}</strong>.
                </p>
                <form @submit.prevent="submitBooking">
                    <!-- Topic and Description -->
                    <div class="form-group">
                        <label for="meeting-topic">Topic *</label>
                        <textarea
                            id="meeting-topic"
                            v-model="meetingTopic"
                            placeholder="e.g., Career advice, resume review, technical skills..."
                            rows="2"
                            required
                        ></textarea>
                        <label for="meeting-description">Description (optional)</label>
                        <textarea
                            id="meeting-description"
                            v-model="meetingDescription"
                            placeholder="e.g., What is ..."
                            rows="4"
                        ></textarea>
                    </div>
                    <!-- Action Buttons -->
                    <div class="modal-actions">
                        <button type="button" class="btn-secondary" @click="$emit('close')">
                            Cancel
                        </button>
                        <button type="submit" class="btn-primary" :disabled="isSubmitting">
                            {{ isSubmitting ? 'Submitting...' : 'Submit Request' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue"
    import { createBooking } from "@/services/booking"

    const props = defineProps({
        slot: { type: Object, required: true },
        mentorName: { type: String, required: false }
    })
    const emit = defineEmits(["close", "submitted"])

    const meetingTopic = ref("")
    const meetingDescription = ref("");
    const isSubmitting = ref(false)

    function formatDate(dateString) {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-AU', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        })
    }

    function formatTime(dateString) {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-AU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })
    }

    function formatEndTime(startTimeString, durationMins) {
        const startTime = new Date(startTimeString)
        const endTime = new Date(startTime.getTime() + durationMins * 60000)
        return endTime.toLocaleTimeString('en-AU', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }

    async function submitBooking() {
        if (!meetingTopic.value.trim()) {
            alert('Please enter a topic for the meeting.')
            return
        }
        
        isSubmitting.value = true
        
        try {
            const payload = {
                availabilitySlotId: props.slot.id,
                topic: meetingTopic.value,
                ...(meetingDescription.value && { description: meetingDescription.value })
            };

            const res = await createBooking(payload);
            console.log('Booking created:', res.data);
            
            // On success
            emit("submitted")
            alert('Your booking request has been sent!')
        } catch (error) {
            console.error('Failed to submit booking: ', error)
            alert('There was an error submitting your request. Please try again.')
        } finally {
            isSubmitting.value = false
        }
    }
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 500px;
    overflow: hidden;
}

.modal-header {
    color:#333;
    font-weight:bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    border-bottom: 1px solid #e0e0e0;
}

.modal-header h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
}

.close-btn {
    background: none;
    border: none;
    font-size: 28px;
    line-height: 1;
    cursor: pointer;
    color: #888;
}

.modal-body {
    padding: 24px;
}

.session-details {
    color:#333;
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 20px;
    background: #f9f9f9;
    padding: 12px;
    border-radius: 8px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    color: #333;
    display: block;
    font-weight: 600;
    margin-bottom: 8px;
    font-size: 14px;
}

.form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-family: Inter, sans-serif;
    font-size: 14px;
    resize: vertical;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
}

.btn-primary, .btn-secondary {
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
}

.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-primary:disabled {
    background-color: #a0cfff;
    cursor: not-allowed;
}

.btn-secondary {
    background-color: #f0f0f0;
    color: #333;
    border: 1px solid #ccc;
}

.btn-secondary:hover {
    background-color: #e0e0e0;
}
</style>
