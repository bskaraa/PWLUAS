const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all examinations
router.get('/', (req, res) => {
    const query = 'SELECT * FROM examinations';
    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Get a single examination
router.get('/:id', (req, res) => {
    const query = 'SELECT * FROM examinations WHERE id = ?';
    db.query(query, [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Examination not found' });
        }
        res.json(results[0]);
    });
});

// Create a new examination
router.post('/', (req, res) => {
    const { patient_id, date, diagnosis } = req.body;
    if (!patient_id || !date || !diagnosis) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const query = 'INSERT INTO examinations (patient_id, date, diagnosis) VALUES (?, ?, ?)';
    db.query(query, [patient_id, date, diagnosis], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ id: result.insertId, message: 'Examination created successfully' });
    });
});

// Update an examination
router.put('/:id', (req, res) => {
    const { patient_id, date, diagnosis } = req.body;
    if (!patient_id || !date || !diagnosis) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const query = 'UPDATE examinations SET patient_id = ?, date = ?, diagnosis = ? WHERE id = ?';
    db.query(query, [patient_id, date, diagnosis, req.params.id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Examination not found' });
        }
        res.json({ message: 'Examination updated successfully' });
    });
});

// Delete an examination
router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM examinations WHERE id = ?';
    db.query(query, [req.params.id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Examination not found' });
        }
        res.json({ message: 'Examination deleted successfully' });
    });
});

module.exports = router;
