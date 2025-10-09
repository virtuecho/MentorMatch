import API from "./api";

export const createBooking = ({
    availabilitySlotId,
    topic,
    description = '',
    note = ''
}) => {
    return API.post("/booking/create", { availabilitySlotId, topic, description, note })
}

export const cancelBooking = ({ bookingId }) => {
    API.post("/booking/cancel", { bookingId });
}

export const respondToBooking = ({ bookingId, response }) => {
    return API.patch(`/booking/${bookingId}/respond`, { response });
}

export const getMentorBookings = () => {
    const role = "mentor";
    return API.get("/booking", { params: { role } });
};

export const getMenteeBookings = () => {
    const role = "mentee";
    return API.get("/booking", { params: { role } });
};