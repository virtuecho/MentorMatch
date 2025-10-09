import API from "./api";

// Function to search for mentors
export const mentorSearch = ({ skill, location, maxResults = 10 }) => {
    return API.get("/mentor/search", { skill, location, maxResults });
}