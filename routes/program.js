const express = require('express');
const router = express.Router();
const { getAllPrograms, createProgram, updateProgram, deleteProgram, toggleProgramStatus } = require('../controllers/programController');

router.get('/', getAllPrograms);
router.post('/', createProgram);
router.put('/:id', updateProgram);
router.delete('/:id', deleteProgram);
router.put('/toggle-status/:id', toggleProgramStatus);

module.exports = router;
