const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'patient_system'
});

connection.connect(error => {
    if (error) {
        console.error('Error connecting to database:', error);
        throw error;
    }
    console.log("Successfully connected to the database.");
    
    // Test query to verify connection and data access
    connection.query('SELECT COUNT(*) as count FROM patients', (error, results) => {
        if (error) {
            console.error('Database test query failed:', error);
        } else {
            console.log('Database test successful. Patient count:', results[0].count);
        }
    });
});

module.exports = connection;

