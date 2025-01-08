const Examination = require('../models/Examination');

exports.getAllExaminations = async (req, res) => {
  try {
    const examinations = await Examination.findAll();
    res.json(examinations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching examinations' });
  }
};

exports.getExamination = async (req, res) => {
  try {
    const examination = await Examination.findById(req.params.id);
    if (!examination) {
      return res.status(404).json({ message: 'Examination not found' });
    }
    res.json(examination);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching examination' });
  }
};

exports.createExamination = async (req, res) => {
  try {
    const newExamination = await Examination.create(req.body);
    res.status(201).json(newExamination);
  } catch (error) {
    res.status(500).json({ message: 'Error creating examination' });
  }
};

exports.updateExamination = async (req, res) => {
  try {
    const updatedExamination = await Examination.update(req.params.id, req.body);
    if (!updatedExamination) {
      return res.status(404).json({ message: 'Examination not found' });
    }
    res.json(updatedExamination);
  } catch (error) {
    res.status(500).json({ message: 'Error updating examination' });
  }
};

exports.deleteExamination = async (req, res) => {
  try {
    const result = await Examination.delete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Examination not found' });
    }
    res.json({ message: 'Examination deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting examination' });
  }
};

