const express = require('express');
const { createFieldAgent, loginUser, resetPassword, getAllUsers, updateUser, deleteUser, toggleUserActivation, getUserProfile, getUserById } = require('../controllers/userController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/', getAllUsers); 
router.post('/login', loginUser);
router.post('/create-field-agent', createFieldAgent);
router.put('/:userId', updateUser); // Update user
router.delete('/:userId', deleteUser); // Delete user
router.put('/:id/toggle-activation', toggleUserActivation);
router.post('/reset-password', resetPassword);
router.get('/profile', auth, getUserProfile);
router.get('/:id', getUserById); // Ensure this fetches a single user by ID



module.exports = router;
