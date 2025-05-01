const User = require('../models/authModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const SECRET_KEY = 'your_secret_key'; // Use env file for security

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  res.json({ message: 'User registered successfully' });
};


// Send OTP
const sendOtp = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();

  // Send email (use real credentials in production)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});


  await transporter.sendMail({
    from: `E-Commerce <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Your OTP for Login',
    html: `<p>Your OTP is <strong>${otp}</strong></p>`
  });

  res.json({ message: 'OTP sent to email' });
};

  

// Verify OTP
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email, otp });
  if (!user || user.otpExpiry < Date.now()) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '2h' });

  res.json({
    message: 'OTP verified',
    token,
    user: {
      name: user.name,
      email: user.email
    }
  });
};






const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate JWT Token
  const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '2h' });

  // Send the token and username in the response
  res.json({
    message: 'Login successful',
    token,
    user: {
      name: user.name, // Include the user's name in the response
      email: user.email // Optionally, include the email as well
    }
  });
};


module.exports = { registerUser, verifyOtp,sendOtp,loginUser };
