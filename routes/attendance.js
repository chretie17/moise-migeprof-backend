const express = require('express');
const router = express.Router();
const { createAttendance, getAttendances } = require('../controllers/attendanceController');
const { authMiddleware } = require('../middlewares/auth');

router.post('/', authMiddleware, createAttendance);
router.get('/', authMiddleware, getAttendances);

module.exports = router;
