import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch("/hotels.json") // Fetch static JSON
      .then((res) => res.json())
      .then((data) => setHotels(data));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Available Hotels ✨
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <motion.div
            key={hotel.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold">{hotel.name}</h3>
            <p className="text-gray-600">{hotel.location}</p>
            <p className="text-blue-600 font-bold">₹{hotel.price}/night</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
