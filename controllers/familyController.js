const { Family, Program, FamilyProgram, Attendance } = require('../models');
const { validationResult } = require('express-validator');

exports.registerFamily = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      Address, Status, FamilyHeadName, NumberOfMembers,
      IncomeLevel, EducationLevel, ProgramID,
      Province, District, Sector, Cell, Village
    } = req.body;
    
    const family = await Family.create({
      Address,
      Status,
      FamilyHeadName,
      NumberOfMembers,
      IncomeLevel,
      EducationLevel,
      Province,
      District,
      Sector,
      Cell,
      Village,
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
    console.error('Error registering family:', error);
    res.status(500).json({ message: 'Error registering family', error });
  }
};

exports.updateFamily = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const {
      Address, Status, FamilyHeadName, NumberOfMembers,
      IncomeLevel, EducationLevel,
      Province, District, Sector, Cell, Village
    } = req.body;

    const family = await Family.findByPk(id);
    if (!family) {
      return res.status(404).json({ message: 'Family not found' });
    }

    await family.update({
      Address,
      Status,
      FamilyHeadName,
      NumberOfMembers,
      IncomeLevel,
      EducationLevel,
      Province,
      District,
      Sector,
      Cell,
      Village,
    });

    res.status(200).json(family);
  } catch (error) {
    console.error('Error updating family:', error);
    res.status(500).json({ message: 'Error updating family', error });
  }
};
exports.deleteFamily = async (req, res) => {
  try {
    const { id } = req.params;
    const family = await Family.findByPk(id);
    if (!family) {
      return res.status(404).json({ message: 'Family not found' });
    }

    await family.destroy();
    res.status(200).json({ message: 'Family deleted successfully' });
  } catch (error) {
    console.error('Error deleting family:', error);
    res.status(500).json({ message: 'Error deleting family', error });
  }
};

exports.addAttendance = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('Validation errors:', errors.array());
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
    console.error('Error adding attendance:', error);
    res.status(500).json({ message: 'Error adding attendance', error });
  }
};

exports.getFamilies = async (req, res) => {
  try {
    const families = await Family.findAll({
      include: [{ model: Program, through: { attributes: [] }, attributes: ['ProgramName'] }]
    });

    const familyData = families.map(family => ({
      FamilyID: family.FamilyID,
      FamilyHeadName: family.FamilyHeadName,
      Address: family.Address,
      Status: family.Status,
      NumberOfMembers: family.NumberOfMembers,
      IncomeLevel: family.IncomeLevel,
      EducationLevel: family.EducationLevel,
      Province: family.Province,
      District: family.District,
      Sector: family.Sector,
      Cell: family.Cell,
      Village: family.Village,
      Programs: family.Programs.map(program => program.ProgramName).join(', ')
    }));

    res.status(200).json(familyData);
  } catch (error) {
    console.error('Error fetching families:', error);
    res.status(500).json({ error: 'Error fetching families' });
  }
};

exports.getallFamilies = async (req, res) => {
  try {
    const families = await Family.findAll({
      include: [{ model: Program }]
    });
    res.status(200).json(families);
  } catch (error) {
    console.error('Error fetching families:', error);
    res.status(500).json({ error: 'Error fetching families' });
  }
};

exports.getPrograms = async (req, res) => {
  try {
    const programs = await Program.findAll();
    res.status(200).json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ error: 'Error fetching programs' });
  }
};
exports.getFamiliesByProgram = async (req, res) => {
  try {
    const { programId } = req.params;
    const families = await Family.findAll({
      include: [{ model: Program, where: { ProgramID: programId } }]
    });
    res.status(200).json(families);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching families', error });
  }
};