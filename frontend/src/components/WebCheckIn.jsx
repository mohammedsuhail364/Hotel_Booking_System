import { useState } from "react";
import { motion } from "framer-motion";

const WebCheckIn = ({ onCheckIn }) => {
  const [aadhaar, setAadhaar] = useState("");

  const handleCheckIn = () => {
    const aadhaarNumbers = aadhaar
      .split(",")
      .map((num) => num.trim())
      .filter((num) => num.length > 0); // Remove empty values
    console.log(aadhaarNumbers); // Debugging output
  
    if (aadhaarNumbers.some((num) => num.length != 4 || isNaN(num))) {
      alert("Each Aadhaar number must be a valid 12-digit numeric value.");
      return;
    }
  
    onCheckIn(aadhaarNumbers);
    setAadhaar('')
  };
  
  
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-bold">Web Check-In ✅</h2>
      <input
        type="text"
        placeholder="Enter Aadhaar numbers (comma-separated)"
        className="w-full p-3 border rounded-md mb-2 focus:ring-2 focus:ring-green-400"
        value={aadhaar}
        onChange={(e) => setAadhaar(e.target.value)}
      />
      <button
        onClick={handleCheckIn}
        className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition"
      >
        Check-In
      </button>
    </motion.div>
  );
};

export default WebCheckIn;
