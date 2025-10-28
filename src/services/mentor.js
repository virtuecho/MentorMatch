import API from "./api";

// Function to recommend for mentors
export const mentorRecommend = ( maxResults=6 ) => {
    return API.get("/mentor/recommend", { params: { maxResults }});
}

// Function to search for mentors
export const mentorSearch = ({ query, maxResults=6 }) => {
    return API.get("/mentor/search", { params: { q: query, maxResults }});
}

// Function to view a public mentor profile
export const getMentorProfile = ({ mentorId }) => {
    return API.get(`/mentor/${mentorId}`);
}