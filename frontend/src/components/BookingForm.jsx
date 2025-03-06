import { useState, useContext } from "react";
import { bookHotel } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const BookingForm = ({ onBook }) => {
  const { user } = useContext(AuthContext);
  const [hotelName, setHotelName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const id=sessionStorage.getItem('id')
  const handleBooking = async () => {
    if (!id) return alert("Please log in first!");
    await onBook({ hotelName, checkIn, aadhaar: aadhaar.split(",") });
    alert("Hotel booked successfully!");
    setHotelName('')
    setCheckIn('')
    setAadhaar('')
  };
  
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">Book a Hotel 🏨</h2>
      <input
        type="text"
        placeholder="Hotel Name"
        className="w-full p-3 border rounded-md mb-2 focus:ring-2 focus:ring-blue-400"
        value={hotelName}
        onChange={(e) => setHotelName(e.target.value)}
      />
      <input
        type="date"
        className="w-full p-3 border rounded-md mb-2 focus:ring-2 focus:ring-blue-400"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
      />
      <input
        type="text"
        placeholder="Aadhaar Numbers (comma-separated)"
        className="w-full p-3 border rounded-md mb-2 focus:ring-2 focus:ring-blue-400"
        value={aadhaar}
        onChange={(e) => setAadhaar(e.target.value)}
      />
      <button
        onClick={handleBooking}
        className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
      >
        Book Now
      </button>
    </motion.div>
  );
};

export default BookingForm;
