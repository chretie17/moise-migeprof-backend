const jwt = require('jsonwebtoken');

// Use a secure, randomly generated string for your JWT secret
const JWT_SECRET = 'f908c512978a1ff29fbe21f26a19530f59da1c47a4dcdbe9111b0cb22a1e8507b8fd898dfbb82d2fb04ef8aa3d8acd5f8117f643b7d33c1925565ced0bd87093';

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken
};
