const db = require('../config/database');

class User {
  static async findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
        if (error) reject(error);
        resolve(results[0]);
      });
    });
  }
}

module.exports = User;

