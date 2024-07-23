const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'f908c512978a1ff29fbe21f26a19530f59da1c47a4dcdbe9111b0cb22a1e8507b8fd898dfbb82d2fb04ef8aa3d8acd5f8117f643b7d33c1925565ced0bd87093';



// Function to handle user login
exports.loginUser = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await User.findOne({ where: { Email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ UserID: user.UserID, Role: user.Role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.Role, mustResetPassword: user.MustResetPassword });
  } catch (error) {
    console.error('Error during login:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
// Function to handle password reset
exports.resetPassword = async (req, res) => {
  const { UserID, oldPassword, newPassword } = req.body;
  try {
    const user = await User.findByPk(UserID);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    // Hash new password and update
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update({ Password: hashedPassword, MustResetPassword: false }, { where: { UserID } });

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error resetting password', error: error.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

exports.createFieldAgent = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    if (role !== 'field-agent') {
      return res.status(400).json({ message: 'Invalid role' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      Username: username,
      Email: email,
      Password: hashedPassword,
      Role: role,
    });
    res.json({ message: 'Field agent created successfully', user });
  } catch (error) {
    console.error('Error creating field agent:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error creating field agent', error: error.message });
  }
};
exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, email, password, role } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (username) user.Username = username;
    if (email) user.Email = email;
    if (password) user.Password = await bcrypt.hash(password, 10);
    if (role) user.Role = role;
    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

exports.toggleUserActivation = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.IsActive = !user.IsActive;
    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Error toggling user activation', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getUserProfile = async (req, res) => {
  res.json(req.user);
};
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};