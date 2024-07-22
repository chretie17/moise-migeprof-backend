const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = 'f908c512978a1ff29fbe21f26a19530f59da1c47a4dcdbe9111b0cb22a1e8507b8fd898dfbb82d2fb04ef8aa3d8acd5f8117f643b7d33c1925565ced0bd87093';

const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.UserID);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate.' });
  }
};

module.exports = auth;
