const { Family, Program, Attendance } = require('../models');
const { validationResult } = require('express-validator');

exports.registerFamily = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { Address, Status, ProgramID } = req.body;
    const family = await Family.create({
      Address,
      Status
    });

    if (ProgramID) {
      await FamilyProgram.create({
        FamilyID: family.FamilyID,
        ProgramID,
        Status
      });
    }

    res.status(201).json(family);
  } catch (error) {
    res.status(500).json({ message: 'Error registering family', error });
  }
};

exports.addAttendance = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { ProgramID, FamilyID, Status } = req.body;
    const attendance = await Attendance.create({
      ProgramID,
      FamilyID,
      Status
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error adding attendance', error });
  }
};

exports.getFamilies = async (req, res) => {
  try {
    const families = await Family.findAll({
      include: [{ model: Program }]
    });
    res.status(200).json(families);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching families' });
  }
};

exports.getPrograms = async (req, res) => {
  try {
    const programs = await Program.findAll();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching programs' });
  }
};
