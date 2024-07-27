const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Report routes
router.get('/reports/field-agents', reportController.getFieldAgentsReport);
router.get('/reports/programs-families', reportController.getProgramsAndFamiliesReport);
router.get('/reports/contents', reportController.getContentsReport);
router.get('/reports/feedback', reportController.getFeedbackReport);
router.get('/reports/feedback/:feedbackID', reportController.getDetailedFeedbackReport);
router.get('/feedback/ids', reportController.getAllFeedbackIDs);

module.exports = router;
