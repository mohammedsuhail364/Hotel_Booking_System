import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const bookHotel = (data, token) =>
  API.post("/bookings/book", data, { headers: { Authorization: `Bearer ${token}` } });
export const getUserBookings = (userId) => API.get(`/bookings/user/${userId}`);
export const checkInHotel = (bookingId, token) =>
  API.post(`/bookings/checkin/${bookingId}`, ['1234','1234','1234'], { headers: { Authorization: `Bearer ${token}` } });
