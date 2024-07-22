const express = require('express');
const { body } = require('express-validator');
const attendanceController = require('../controllers/attendanceController');
const router = express.Router();

router.get('/', attendanceController.getAttendances);

router.post(
  '/',
  [
    body('ProgramID').notEmpty().withMessage('ProgramID is required'),
    body('FamilyID').notEmpty().withMessage('FamilyID is required'),
    body('Status').notEmpty().withMessage('Status is required'),
    body('UserID').notEmpty().withMessage('UserID is required'),
  ],
  attendanceController.addOrUpdateAttendance
);

module.exports = router;
