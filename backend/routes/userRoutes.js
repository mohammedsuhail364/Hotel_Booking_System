const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if(user){
      return res.status(400).json({
        success:false,
        message:'Email is already registered'
      })
    }
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    res.json({ success: true, message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user.id }, "myverystrongsecretkey");
  res.status(200).json({
    success:true,
    message:'you are successfully logged in', 
    data:user,
    token
  })
});

module.exports = router;
