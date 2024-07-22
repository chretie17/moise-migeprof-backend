const express = require('express');
const { body } = require('express-validator');
const contentController = require('../controllers/contentController');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', contentController.getAllContents);

router.post(
  '/',
  upload.single('Video'),
  [
    body('Title').notEmpty().withMessage('Title is required'),
    body('Description').notEmpty().withMessage('Description is required'),
    body('ProgramID').notEmpty().withMessage('ProgramID is required'),
  ],
  contentController.createContent
);

router.put(
  '/:id',
  upload.single('Video'),
  [
    body('Title').optional().notEmpty().withMessage('Title is required'),
    body('Description').optional().notEmpty().withMessage('Description is required'),
    body('ProgramID').optional().isInt().withMessage('ProgramID must be an integer'),
  ],
  contentController.updateContent
);

router.delete('/:id', contentController.deleteContent);

module.exports = router;
