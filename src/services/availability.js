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
    

// Mentee view availability slots given mentor id
export const getMentorAvailability = (mentorID) =>
    API.get("/mentor/:mentorId", { mentorID });