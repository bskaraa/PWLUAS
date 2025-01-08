// Validation middleware for patient data
exports.validatePatient = (req, res, next) => {
    const { name, dob, gender } = req.body;
    const errors = [];

    // Validate name
    if (!name || name.trim().length === 0) {
        errors.push('Name is required');
    } else if (name.length > 100) {
        errors.push('Name must be less than 100 characters');
    }

    // Validate date of birth
    if (!dob) {
        errors.push('Date of birth is required');
    } else {
        const dobDate = new Date(dob);
        const today = new Date();
        if (isNaN(dobDate.getTime())) {
            errors.push('Invalid date of birth');
        } else if (dobDate > today) {
            errors.push('Date of birth cannot be in the future');
        }
    }

    // Validate gender
    if (!gender) {
        errors.push('Gender is required');
    } else if (!['male', 'female', 'other'].includes(gender.toLowerCase())) {
        errors.push('Gender must be either male, female, or other');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

// Validation middleware for examination data
exports.validateExamination = (req, res, next) => {
    const { patient_id, date, diagnosis } = req.body;
    const errors = [];

    // Validate patient_id
    if (!patient_id) {
        errors.push('Patient ID is required');
    } else if (isNaN(parseInt(patient_id))) {
        errors.push('Patient ID must be a number');
    }

    // Validate date
    if (!date) {
        errors.push('Examination date is required');
    } else {
        const examDate = new Date(date);
        const today = new Date();
        if (isNaN(examDate.getTime())) {
            errors.push('Invalid examination date');
        } else if (examDate > today) {
            errors.push('Examination date cannot be in the future');
        }
    }

    // Validate diagnosis
    if (!diagnosis || diagnosis.trim().length === 0) {
        errors.push('Diagnosis is required');
    } else if (diagnosis.length > 500) {
        errors.push('Diagnosis must be less than 500 characters');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

// Validation middleware for user data
exports.validateUser = (req, res, next) => {
    const { username, password, role } = req.body;
    const errors = [];

    // Validate username
    if (!username || username.trim().length === 0) {
        errors.push('Username is required');
    } else if (username.length < 3) {
        errors.push('Username must be at least 3 characters long');
    } else if (username.length > 50) {
        errors.push('Username must be less than 50 characters');
    }

    // Validate password
    if (!password || password.trim().length === 0) {
        errors.push('Password is required');
    } else if (password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }

    // Validate role
    if (!role) {
        errors.push('Role is required');
    } else if (!['admin', 'doctor'].includes(role.toLowerCase())) {
        errors.push('Role must be either admin or doctor');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};
