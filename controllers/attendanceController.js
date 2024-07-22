const { Attendance } = require('../models');

exports.createAttendance = async (req, res) => {
  const { ProgramID, UserID, FamilyID, Date, Status } = req.body;
  try {
    const attendance = await Attendance.create({ ProgramID, UserID, FamilyID, Date, Status });
    res.status(201).json({ message: 'Attendance created successfully', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Error creating attendance', error });
  }
};

exports.getAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.findAll();
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving attendances', error });
  }
};
