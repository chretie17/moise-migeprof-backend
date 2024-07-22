const express = require('express');
const { createOrUpdateFeedback, getAllFeedback, submitFeedback } = require('../controllers/feedbackController');
const router = express.Router();

router.get('/', getAllFeedback);
router.post('/', createOrUpdateFeedback);
router.post('/submit', submitFeedback);


module.exports = router;
