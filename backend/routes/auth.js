// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

// Route untuk login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validasi input
        if (!username || !password) {
            return res.status(400).json({ 
                message: 'Username dan password harus diisi' 
            });
        }

        // Query ke database
        db.query(
            'SELECT * FROM users WHERE username = ?',
            [username],
            async (error, results) => {
                if (error) {
                    console.error('Database error:', error);
                    return res.status(500).json({ 
                        message: 'Terjadi kesalahan pada server' 
                    });
                }

                // Cek apakah user ditemukan
                if (results.length === 0) {
                    return res.status(401).json({ 
                        message: 'Username atau password salah' 
                    });
                }

                const user = results[0];

                // Verifikasi password
                const isValid = await bcrypt.compare(password, user.password);

                if (!isValid) {
                    return res.status(401).json({ 
                        message: 'Username atau password salah' 
                    });
                }

                // Buat token JWT
                const token = jwt.sign(
                    { 
                        id: user.id, 
                        username: user.username, 
                        role: user.role 
                    },
                    process.env.JWT_SECRET || 'your-secret-key',
                    { expiresIn: '24h' }
                );

                // Kirim response
                res.json({
                    token,
                    user: {
                        id: user.id,
                        username: user.username,
                        role: user.role
                    }
                });
            }
        );
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Terjadi kesalahan pada server' 
        });
    }
});

module.exports = router;