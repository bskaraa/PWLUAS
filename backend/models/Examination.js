const db = require('../config/database');

class Examination {
  static async findAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM examinations', (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM examinations WHERE id = ?', [id], (error, results) => {
        if (error) reject(error);
        resolve(results[0]);
      });
    });
  }

  static async create(examinationData) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO examinations SET ?', examinationData, (error, result) => {
        if (error) reject(error);
        resolve({ id: result.insertId, ...examinationData });
      });
    });
  }

  static async update(id, examinationData) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE examinations SET ? WHERE id = ?', [examinationData, id], (error) => {
        if (error) reject(error);
        resolve({ id, ...examinationData });
      });
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM examinations WHERE id = ?', [id], (error, result) => {
        if (error) reject(error);
        resolve(result.affectedRows > 0);
      });
    });
  }
}

module.exports = Examination;

