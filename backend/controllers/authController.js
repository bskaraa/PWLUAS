const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', { username }); // Log login attempt

    const user = await User.findByUsername(username);
    console.log('User found:', user ? 'Yes' : 'No'); // Log if user was found

    if (!user) {
      console.log('Login failed: User not found');
      return res.status(401).json({ message: 'Username atau password salah' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isValidPassword ? 'Yes' : 'No'); // Log password validation

    if (!isValidPassword) {
      console.log('Login failed: Invalid password');
      return res.status(401).json({ message: 'Username atau password salah' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { 
        expiresIn: '24h',
        algorithm: 'HS256'
      }
    );

    console.log('Login successful for:', username); // Log successful login
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        username: user.username 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat login' });
  }
};

