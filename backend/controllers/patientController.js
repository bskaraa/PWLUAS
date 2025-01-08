const Patient = require('../models/Patient');

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.json(patients);
    } catch (error) {
        console.error('Error in getAllPatients:', error);
        res.status(500).json({ message: 'Error fetching patients', error: error.message });
    }
};

exports.getPatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient);
    } catch (error) {
        console.error('Error in getPatient:', error);
        res.status(500).json({ message: 'Error fetching patient', error: error.message });
    }
};

exports.createPatient = async (req, res) => {
    try {
        const { name, dob, gender } = req.body;
        
        // Basic validation
        if (!name || !dob || !gender) {
            return res.status(400).json({ 
                message: 'Missing required fields',
                required: ['name', 'dob', 'gender']
            });
        }

        const newPatient = await Patient.create({ name, dob, gender });
        res.status(201).json(newPatient);
    } catch (error) {
        console.error('Error in createPatient:', error);
        res.status(500).json({ message: 'Error creating patient', error: error.message });
    }
};

exports.updatePatient = async (req, res) => {
    try {
        const updatedPatient = await Patient.update(req.params.id, req.body);
        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(updatedPatient);
    } catch (error) {
        console.error('Error in updatePatient:', error);
        res.status(500).json({ message: 'Error updating patient', error: error.message });
    }
};

exports.deletePatient = async (req, res) => {
    try {
        const result = await Patient.delete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
        console.error('Error in deletePatient:', error);
        res.status(500).json({ message: 'Error deleting patient', error: error.message });
    }
};

