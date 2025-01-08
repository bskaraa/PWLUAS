const bcrypt = require('bcrypt');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'patient_system'
});

async function createUser() {
  try {
    // Generate hashed password
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL untuk menghapus user yang mungkin sudah ada
    const deleteQuery = 'DELETE FROM users WHERE username = ?';
    
    // SQL untuk membuat user baru
    const insertQuery = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';

    // Hapus user yang mungkin sudah ada
    connection.query(deleteQuery, ['admin'], (error) => {
      if (error) {
        console.error('Error deleting existing user:', error);
        connection.end();
        return;
      }

      // Buat user baru
      connection.query(insertQuery, ['admin', hashedPassword, 'admin'], (error) => {
        if (error) {
          console.error('Error creating user:', error);
        } else {
          console.log('User created successfully!');
          console.log('Username: admin');
          console.log('Password: admin123');
        }
        connection.end();
      });
    });
  } catch (error) {
    console.error('Error:', error);
    connection.end();
  }
}

createUser();

