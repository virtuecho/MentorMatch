import API from "./api";

// Function to search for mentors
export const mentorSearch = ({ skill, location, maxResults }) => {
    return API.get("/mentor/search", { skill, location, maxResults });
}

// Function to view a public mentor profile
export const getMentorProfile = ({ mentorId }) => {
    return API.get(`/mentor/${mentorId}`);
}