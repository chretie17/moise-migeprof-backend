const express = require('express');
const { registerFamily, updateFamily, deleteFamily, addAttendance, getFamilies, getPrograms } = require('../controllers/familyController'); 
const router = express.Router();

router.get('/', getFamilies);
router.get('/programs', getPrograms);
router.post('/register', registerFamily);
router.put('/update/:id', updateFamily);
router.delete('/delete/:id', deleteFamily);
router.post('/attendance', addAttendance);


module.exports = router;
