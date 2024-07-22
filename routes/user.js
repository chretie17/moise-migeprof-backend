const express = require('express');
const { createFieldAgent, loginUser, resetPassword, getAllUsers, updateUser, deleteUser, toggleUserActivation } = require('../controllers/userController');
const router = express.Router();

router.get('/', getAllUsers); 
router.post('/login', loginUser);
router.post('/create-field-agent', createFieldAgent);
router.post('/reset-password', resetPassword);
router.put('/:userId', updateUser); // Update user
router.delete('/:userId', deleteUser); // Delete user
router.put('/:id/toggle-activation', toggleUserActivation);



module.exports = router;
