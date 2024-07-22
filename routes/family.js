const express = require('express');
const { body } = require('express-validator');
const familyController = require('../controllers/familyController');
const router = express.Router();

router.post(
  '/register',
  [
    body('Address').notEmpty().withMessage('Address is required'),
    body('Status').notEmpty().withMessage('Status is required'),
    body('ProgramID').optional().isInt().withMessage('ProgramID must be an integer')
  ],
  familyController.registerFamily
);



router.get('/families', familyController.getFamilies);
router.get('/programs', familyController.getPrograms);

module.exports = router;
