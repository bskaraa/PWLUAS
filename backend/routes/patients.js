const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all patients
router.get('/', (req, res) => {
    const query = 'SELECT * FROM patients';
    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Get a single patient
router.get('/:id', (req, res) => {
    const query = 'SELECT * FROM patients WHERE id = ?';
    db.query(query, [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json(results[0]);
    });
});

// Create a new patient
router.post('/', (req, res) => {
    const { name, dob, gender } = req.body;
    if (!name || !dob || !gender) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const query = 'INSERT INTO patients (name, dob, gender) VALUES (?, ?, ?)';
    db.query(query, [name, dob, gender], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ id: result.insertId, message: 'Patient created successfully' });
    });
});

// Update a patient
router.put('/:id', (req, res) => {
    const { name, dob, gender } = req.body;
    if (!name || !dob || !gender) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const query = 'UPDATE patients SET name = ?, dob = ?, gender = ? WHERE id = ?';
    db.query(query, [name, dob, gender, req.params.id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json({ message: 'Patient updated successfully' });
    });
});

// Delete a patient
router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM patients WHERE id = ?';
    db.query(query, [req.params.id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json({ message: 'Patient deleted successfully' });
    });
});

module.exports = router;
