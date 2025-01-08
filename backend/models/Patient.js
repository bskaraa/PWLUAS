const db = require('../config/database');

class Patient {
  static async findAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM patients', (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM patients WHERE id = ?', [id], (error, results) => {
        if (error) reject(error);
        resolve(results[0]);
      });
    });
  }

  static async create(patientData) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO patients SET ?', patientData, (error, result) => {
        if (error) reject(error);
        resolve({ id: result.insertId, ...patientData });
      });
    });
  }

  static async update(id, patientData) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE patients SET ? WHERE id = ?', [patientData, id], (error) => {
        if (error) reject(error);
        resolve({ id, ...patientData });
      });
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM patients WHERE id = ?', [id], (error, result) => {
        if (error) reject(error);
        resolve(result.affectedRows > 0);
      });
    });
  }
}

module.exports = Patient;

