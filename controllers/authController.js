const User = require('../models/authModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate JWT Token
  const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '2h' });

  res.json({ message: 'Login successful', token });
};

module.exports = { registerUser, loginUser };
