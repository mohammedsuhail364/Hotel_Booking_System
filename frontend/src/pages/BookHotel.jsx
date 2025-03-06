import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { bookHotel, getUserBookings, checkInHotel } from "../api/api";
import BookingForm from "../components/BookingForm";
import WebCheckIn from "../components/WebCheckIn";
import HotelList from "../components/HotelList";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const BookHotel = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const token = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null;
  const id = sessionStorage.getItem("id");

  // Fetch Bookings
  const fetchBookings = async () => {
    if (id) {
      try {
        const res = await getUserBookings(id);
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleBooking = async (data) => {
    if (!id) {
      alert("Please log in first!");
      return;
    }
    try {
      await bookHotel({ ...data, userId: id }, token);
      fetchBookings();
    } catch (error) {
      console.error("Error booking hotel:", error);
    }
  };

  const handleCheckIn = async (aadhaarNumbers) => {
    // console.log(aadhaarNumbers);
    
    // const matchingBooking = bookings.find((b) =>
    //   JSON.stringify(b) === JSON.stringify(aadhaarNumbers)
    // );

    // if (!matchingBooking) {
    //   alert("No matching booking found for these Aadhaar numbers.");
    //   return;
    // }

    try {
      const res=await checkInHotel(id, token);
      if (res.data.success){
        alert("Web check-in successful!");
        fetchBookings();
      }
    } catch (error) {
      console.error("Error during check-in:", error);
    }
  };
  console.log(bookings);
  
  return (
    <motion.div initial="hidden" animate="visible" exit={{ opacity: 0 }} className="container mx-auto p-6">
      <motion.h1 variants={fadeIn} className="text-4xl font-extrabold text-blue-700 text-center mb-6">
        Book Your Dream Hotel 🌟
      </motion.h1>

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
