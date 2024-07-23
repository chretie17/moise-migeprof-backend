const express = require('express');
const { registerFamily, updateFamily, deleteFamily, addAttendance, getFamilies, getPrograms, getFamiliesByProgram } = require('../controllers/familyController'); 
const router = express.Router();

router.get('/', getFamilies);
router.get('/programs', getPrograms);
router.post('/register', registerFamily);
router.put('/update/:id', updateFamily);
router.delete('/delete/:id', deleteFamily);
router.post('/attendance', addAttendance);
router.get('/program/:programId/families', getFamiliesByProgram); // New route



module.exports = router;
