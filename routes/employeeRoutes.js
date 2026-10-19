const express = require('express');
const { body } = require('express-validator');
const employeeController = require('../controllers/employeeController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.use(auth);

router.get('/employees', employeeController.getEmployees);

router.post('/employees', [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('position').notEmpty().withMessage('Position is required'),
    body('salary').isNumeric().withMessage('Salary must be a number'),
    body('date_of_joining').isISO8601().withMessage('Valid date is required'),
    body('department').notEmpty().withMessage('Department is required')
], employeeController.createEmployee);

router.get('/employees/:eid', employeeController.getEmployeeById);
router.put('/employees/:eid', employeeController.updateEmployee);
router.delete('/employees', employeeController.deleteEmployee);

module.exports = router;