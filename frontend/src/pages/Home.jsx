import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Home = () => {
  const navigate=useNavigate()
  useEffect(()=>{
      if(sessionStorage.getItem('token')){
        navigate('/book-hotel')
      }
    })
  
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4" 
      style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?luxury-hotel,resort')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Floating Card */}
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.9 }} 
        animate={{ opacity: 1, y: 0, scale: 1 }} 
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative bg-white/80 backdrop-blur-lg p-12 rounded-3xl shadow-2xl max-w-lg text-center transform hover:shadow-3xl transition-shadow duration-300"
      >
        
        {/* Heading with Animation */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl font-extrabold text-gray-900 drop-shadow-lg"
        >
          Welcome to LuxeStay ✨
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-gray-700 text-lg mt-4"
        >
          Discover luxury stays at the best prices. Start your journey today.
        </motion.p>

        {/* Buttons with Hover Effects & Proper Spacing */}
        <div className="flex flex-col space-y-6 mt-8">
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/register" 
              className="w-full inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
            >
              Register Now
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/login" 
              className="w-full inline-block bg-gradient-to-r from-green-500 to-green-700 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:shadow-lg hover:from-green-600 hover:to-green-800 transition-all duration-300"
            >
              Login
            </Link>
          </motion.div>

        </div>

      </motion.div>
    </div>
  );
};

export default Home;
