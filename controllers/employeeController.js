const Employee = require('../models/Employee');
const { validationResult } = require('express-validator');

exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({ user: req.user.userId });
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

exports.createEmployee = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const employeeData = { ...req.body, user: req.user.userId };
        const newEmployee = new Employee(employeeData);
        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully.', employee_id: newEmployee._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findOne({ _id: req.params.eid, user: req.user.userId });
        if (!employee) return res.status(404).json({ message: 'Employee not found or access denied.' });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findOneAndUpdate(
            { _id: req.params.eid, user: req.user.userId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!employee) return res.status(404).json({ message: 'Employee not found or access denied.' });
        res.status(200).json({ message: 'Employee details updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const eid = req.query.eid;
        if (!eid) return res.status(400).json({ message: 'Employee ID (eid) is required as a query parameter.' });

        const employee = await Employee.findOneAndDelete({ _id: eid, user: req.user.userId });
        if (!employee) return res.status(404).json({ message: 'Employee not found or access denied.' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};