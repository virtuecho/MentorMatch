import API from "./api";

// Function to search for mentors
export const mentorSearch = ({ skill, location, maxResults = 10 }) => {
    return API.post("/mentor/search", { skill, location, maxResults });
}