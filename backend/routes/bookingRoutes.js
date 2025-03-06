const express = require("express");
const prisma = require("../db");

const router = express.Router();

// Book a hotel
router.post("/book", async (req, res) => {
  const { userId, hotelName, checkIn, aadhaar } = req.body;

  if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
  }

  try {
      // Check if user exists
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
          return res.status(404).json({ error: "User not found." });
      }

      // Create booking
      const booking = await prisma.booking.create({
          data: {
              user: { connect: { id: userId } }, // Ensures user exists
              hotelName,
              checkIn: new Date(checkIn),
              aadhaar,
          },
      });

      res.json(booking);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Get all user bookings
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const bookings = await prisma.booking.findMany({ where: { userId } });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Web Check-in Route
router.post("/checkin/:bookingId", async (req, res) => {
  const { bookingId } = req.params;
  const { aadhaarNumbers } = req.body;

  try {
    // Find the booking
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });
    return res.json({ success: true, message: "Check-in successful!" });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    // Compare Aadhaar numbers as sets to ensure they match regardless of order
    const storedAadhaarSet = new Set(booking.aadhaar);
    const inputAadhaarSet = new Set(aadhaarNumbers);

    if (
      storedAadhaarSet.size !== inputAadhaarSet.size ||
      ![...storedAadhaarSet].every((num) => inputAadhaarSet.has(num))
    ) {
      return res
        .status(400)
        .json({ error: "Aadhaar numbers do not match the booking." });
    }

    // Update the booking status to Checked In
    await prisma.booking.update({
      where: { id: bookingId },
      data: { checkedIn: true },
    });

    res.json({ message: "Check-in successful!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
