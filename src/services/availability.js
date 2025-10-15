import API from "./api";

// Create availability slot
export const createAvailability = ({
    title = "No title",
    startTime,
    durationMins,
    city,
    address,
    maxParticipants = 1,
    note
}) => {
    const payload = { title, startTime, durationMins, city, address };

    if (note) {
        payload.note = note;
    }

    return API.post("/availability/slots", payload);
}

// User view their own availability slots
export const getMyAvailability = () => {
    return API.get("/availability/slots");
}

// Mentee view availability slots given mentor id
export const getMentorAvailability = ({ mentorId }) => {
    return API.get(`/availability/mentor/${mentorId}`);
}

// Delete your availability slot
export const deleteAvailability = ({ slotId }) => {
    API.delete(`/availability/slots/${slotId}`, { slotId })
}