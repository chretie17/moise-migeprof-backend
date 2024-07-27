const { Attendance } = require('../models');
const { validationResult } = require('express-validator');
const moment = require('moment-timezone');


exports.addOrUpdateAttendance = async (req, res) => {
  const { ProgramID, FamilyID, Status, UserID } = req.body;

  try {
    console.log('Request body:', req.body); // Log the request body for debugging

    const existingAttendance = await Attendance.findOne({
      where: { ProgramID, FamilyID }
    });

    const currentTimeInKigali = moment().tz('Africa/Kigali').format('YYYY-MM-DD HH:mm:ss');

    if (existingAttendance) {
      console.log('Existing attendance found:', existingAttendance); // Log existing attendance for debugging

      existingAttendance.Status = Status;
      existingAttendance.UserID = UserID;
      existingAttendance.updatedAt = currentTimeInKigali; // Update the timestamp

      await existingAttendance.save();
      return res.status(200).json(existingAttendance);
    } else {
      const newAttendance = await Attendance.create({
        ProgramID,
        FamilyID,
        Status,
        UserID,
        createdAt: currentTimeInKigali, // Set the timestamp
        updatedAt: currentTimeInKigali  // Set the timestamp
      });

      console.log('New attendance created:', newAttendance); // Log new attendance for debugging

      return res.status(201).json(newAttendance);
    }
  } catch (error) {
    console.error('Error recording attendance:', error); // Detailed error logging
    res.status(500).json({ message: 'Error recording attendance', error: error.message });
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
