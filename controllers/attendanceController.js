const { Attendance } = require('../models');
const { validationResult } = require('express-validator');

exports.addOrUpdateAttendance = async (req, res) => {
  const { ProgramID, FamilyID, Status, UserID } = req.body;

  try {
    const existingAttendance = await Attendance.findOne({
      where: { ProgramID, FamilyID }
    });

    if (existingAttendance) {
      existingAttendance.Status = Status;
      existingAttendance.UserID = UserID;
      await existingAttendance.save();
      return res.status(200).json(existingAttendance);
    } else {
      const newAttendance = await Attendance.create({
        ProgramID,
        FamilyID,
        Status,
        UserID
      });
      return res.status(201).json(newAttendance);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error recording attendance', error });
  }
};

exports.getAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.findAll();
    res.status(200).json(attendances);
  } catch (error) {
    console.error('Error fetching attendances:', error);
    res.status(500).json({ error: 'Error fetching attendances' });
  }
};
