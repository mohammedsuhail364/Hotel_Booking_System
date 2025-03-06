const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
