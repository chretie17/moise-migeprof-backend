const { Program } = require('../models');
const { Buffer } = require('buffer');

exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.findAll();
    const programsWithBase64Thumbnails = programs.map(program => ({
      ...program.toJSON(),
      Thumbnail: program.Thumbnail ? Buffer.from(program.Thumbnail).toString('base64') : null
    }));
    res.json(programsWithBase64Thumbnails);
  } catch (error) {
    console.error('Error fetching programs', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createProgram = async (req, res) => {
  try {
    const { ProgramName, Description, Thumbnail } = req.body;
    const program = await Program.create({
      ProgramName,
      Description,
      Thumbnail: Thumbnail ? Buffer.from(Thumbnail, 'base64') : null
    });
    res.json(program);
  } catch (error) {
    console.error('Error creating program', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const { ProgramName, Description, Thumbnail, IsActive } = req.body;
    const program = await Program.findByPk(id);
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    program.ProgramName = ProgramName;
    program.Description = Description;
    program.Thumbnail = Thumbnail ? Buffer.from(Thumbnail, 'base64') : program.Thumbnail;
    program.IsActive = IsActive;
    await program.save();
    res.json(program);
  } catch (error) {
    console.error('Error updating program', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await Program.findByPk(id);
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    await program.destroy();
    res.json({ message: 'Program deleted successfully' });
  } catch (error) {
    console.error('Error deleting program', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.toggleProgramStatus = async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);
    if (program) {
      program.IsActive = !program.IsActive;
      await program.save();
      res.status(200).json({ message: 'Program status updated successfully', program });
    } else {
      res.status(404).json({ message: 'Program not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating program status', error });
  }
};