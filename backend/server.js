const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./config/database.js');
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const examinationRoutes = require('./routes/examinations');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/examinations', examinationRoutes);

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ 
      error: 'Username and password are required' 
    });
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  
  db.query(query, [username], async (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ 
        error: 'Internal server error' 
      });
    }

    if (results.length === 0) {
      return res.status(401).json({ 
        error: 'User not found' 
      });
    }

    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ 
        error: 'Invalid password' 
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      'your_jwt_secret',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

