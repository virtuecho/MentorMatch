import API from "./api";

// Create availability slot
export const createAvailability = (startTime, endTime) => 
    API.post("/availability/slots", { startTime, endTime });

// Mentee view availability slots given mentor id
export const getMentorAvailability = (mentorID) =>
    API.get("/mentor/:mentorId", { mentorID });