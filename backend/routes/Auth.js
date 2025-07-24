const express = require('express');
const User = require('../models/User');
const LawyerProfile=require('../models/LawyerProfile');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, fullName, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      fullName,
      email,
      password: hashedPassword,
      role
    });

    const user=await newUser.save();

    if(role==="lawyer"){

      const newProfile = new LawyerProfile({
        userId: user.id,
        name: fullName,
        email: email,
      });
      
  
      await newProfile.save();
    }
    
    res.status(201).json({ success: true, message: "User registered successfully" });

  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ success: false, message: "Server error during signup" });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Incorrect password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1h' });

    // Send success response with token and role
    res.status(200).json({ success: true, message: "Login successful", token, role: user.role });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
});


module.exports = router;
