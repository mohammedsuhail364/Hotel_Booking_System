import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { bookHotel, getUserBookings, checkInHotel } from "../api/api";
import BookingForm from "../components/BookingForm";
import WebCheckIn from "../components/WebCheckIn";
import HotelList from "../components/HotelList";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const BookHotel = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const token = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null;
  const id = sessionStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchBookings();
    }
  }, []);

  const fetchBookings = async () => {
    if (!id) return;
    try {
      const res = await getUserBookings(id);
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleBooking = async (data) => {
    if (!id || !token) {
      alert("Please log in first!");
      return;
    }
    try {
      await bookHotel({ ...data, userId: id }, token);
      alert("Hotel booked successfully!");
      fetchBookings();
    } catch (error) {
      console.error("Error booking hotel:", error);
      alert("Booking failed. Try again.");
    }
  };

  const handleCheckIn = async (aadhaarNumbers) => {
    if (!id || !token) {
      alert("Please log in first!");
      return;
    }
    try {
      const res = await checkInHotel(id, { aadhaarNumbers }, token);
      if (res.data.success) {
        alert("Web check-in successful!");
        fetchBookings();
      } else {
        alert("Check-in failed. Ensure Aadhaar numbers are valid.");
      }
    } catch (error) {
      console.error("Error during check-in:", error);
      alert("Check-in failed. Try again.");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("id");
      navigate("/");
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" exit={{ opacity: 0 }} className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <motion.h1 variants={fadeIn} className="text-4xl font-extrabold text-blue-700">
          Book Your Dream Hotel 🌟
        </motion.h1>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition">
          Logout
        </button>
      </div>

      <motion.div variants={fadeIn} className="mt-4">
        <HotelList />
      </motion.div>

      <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <BookingForm onBook={handleBooking} />
        <WebCheckIn onCheckIn={handleCheckIn} />
      </motion.div>

      <motion.div variants={fadeIn} className="mt-10 bg-white p-6 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Bookings</h2>
        <ul className="divide-y divide-gray-300">
          {bookings.length > 0 ? (
            bookings.map((b) => (
              <motion.li key={b.id} className="py-2 flex justify-between items-center transition-all hover:bg-gray-100 rounded-lg p-2" whileHover={{ scale: 1.02 }}>
                <span className="text-lg font-semibold">{b.hotelName}</span>
                <span className="text-gray-600 text-sm">Check-in: {new Date(b.checkIn).toLocaleDateString()}</span>
              </motion.li>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4 text-lg">No bookings yet.</p>
          )}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default BookHotel;
