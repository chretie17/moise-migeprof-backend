const express = require('express');
const { createOrUpdateFeedback, getAllFeedback, submitFeedback, getTodayAttendance, getProgramAttendanceForToday } = require('../controllers/feedbackController');
const router = express.Router();

router.get('/', getAllFeedback);
router.post('/', createOrUpdateFeedback);
router.post('/submit', submitFeedback);
router.get('/today-attendance/:programId', getProgramAttendanceForToday);



module.exports = router;
