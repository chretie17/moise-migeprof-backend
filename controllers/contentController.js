const { Content, Program } = require('../models');
const { validationResult } = require('express-validator');

exports.createContent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { Title, Description, ProgramID } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Video file is required' });
    }

    const Video = req.file.buffer; // multer stores the file buffer in `buffer`

    const content = await Content.create({
      Title,
      Description,
      ProgramID,
      Video,
    });

    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error creating content', error });
  }
};

exports.updateContent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const content = await Content.findByPk(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    const { Title, Description, ProgramID } = req.body;
    const updateValues = { Title, Description, ProgramID };

    if (req.file) {
      const Video = req.file.buffer;
      updateValues.Video = Video;
    }

    await content.update(updateValues);
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error updating content', error });
  }
};

exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findByPk(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    await content.destroy();
    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting content', error });
  }
};

exports.getAllContents = async (req, res) => {
  try {
    const contents = await Content.findAll({
      include: [{ model: Program, attributes: ['ProgramName'] }],
    });

    const contentsWithBase64Video = contents.map(content => ({
      ...content.toJSON(),
      Video: content.Video ? content.Video.toString('base64') : null,
    }));

    res.status(200).json(contentsWithBase64Video);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching contents' });
  }
};
