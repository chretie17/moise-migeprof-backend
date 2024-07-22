const { Feedback } = require('../models');

exports.createFeedback = async (req, res) => {
  const { FamilyID, ContentID, Rating, Comments, Date } = req.body;
  try {
    const feedback = await Feedback.create({ FamilyID, ContentID, Rating, Comments, Date });
    res.status(201).json({ message: 'Feedback created successfully', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error creating feedback', error });
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving feedbacks', error });
  }
};
