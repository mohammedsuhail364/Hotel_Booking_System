import { useState, useContext, useEffect } from "react";
import { login } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login: setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login(formData);
      
      if (res.data.success) {
        setUser(res.data.data); // Store user in context
        alert("Logged in successfully!");
        navigate("/book-hotel");
        sessionStorage.setItem('token',JSON.stringify(res.data.token))
        sessionStorage.setItem('id',res.data.data.id)
      }
      
    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      navigate('/book-hotel')
    }
  })

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 relative"
      style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?city,night,hotel')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.9 }} 
        animate={{ opacity: 1, y: 0, scale: 1 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-md w-full text-center"
      >
        <motion.h1 className="text-4xl font-extrabold text-gray-900 drop-shadow-lg">
          Welcome Back 👋
        </motion.h1>
        <p className="text-gray-600 text-lg mt-4">Log in to continue your journey.</p>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg focus:ring-green-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full p-3 border rounded-lg mt-4 focus:ring-green-500"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition mt-6"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
