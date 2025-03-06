import { useState } from "react";
import { motion } from "framer-motion";

const BookingForm = ({ onBook }) => {
  const [hotelName, setHotelName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [aadhaar, setAadhaar] = useState("");

  const handleBooking = () => {
    if (!hotelName || !checkIn || !aadhaar) {
      alert("All fields are required!");
      return;
    }
    
    const aadhaarNumbers = aadhaar.split(",").map(num => num.trim());
    if (aadhaarNumbers.some(num => num.length !== 4 || isNaN(num))) {
      alert("Each Aadhaar number must be 12 digits.");
      return;
    }

    onBook({ hotelName, checkIn, aadhaar: aadhaarNumbers });

    setHotelName("");
    setCheckIn("");
    setAadhaar("");
  };

  return (
    <motion.div className="bg-white p-6 rounded-lg shadow-lg" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Book a Hotel 🏨</h2>
      <input type="text" placeholder="Hotel Name" className="w-full p-3 border rounded-md mb-2 focus:ring-2 focus:ring-blue-400" value={hotelName} onChange={(e) => setHotelName(e.target.value)} />
      <input type="date" className="w-full p-3 border rounded-md mb-2 focus:ring-2 focus:ring-blue-400" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
      <input type="text" placeholder="Aadhaar Numbers (comma-separated)" className="w-full p-3 border rounded-md mb-2 focus:ring-2 focus:ring-blue-400" value={aadhaar} onChange={(e) => setAadhaar(e.target.value)} />
      <button onClick={handleBooking} className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition">Book Now</button>
    </motion.div>
  );
};

export default BookingForm;
