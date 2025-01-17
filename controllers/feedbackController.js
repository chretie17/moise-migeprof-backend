const moment = require('moment-timezone');
const { Feedback, Program, Family, Attendance } = require('../models');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.createOrUpdateFeedback = async (req, res) => {
  try {
    const { ContentID, FamilyID, Rating } = req.body;
    let feedback = await Feedback.findOne({ where: { ContentID, FamilyID } });

    if (feedback) {
      feedback.Rating = Rating;
      await feedback.save();
    } else {
      feedback = await Feedback.create(req.body);
    }

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error creating or updating feedback', error });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({
      include: {
        model: Program,
        attributes: ['ProgramName'] // Only fetch the ProgramName attribute
      }
    });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedbacks', error });
  }
};


exports.submitFeedback = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      programId,
      fullName,
      email,
      serviceName,
      sessionDate,
      constructiveFeedback,
      uncertainties,
      recommend,
      additionalComments,
      rating // Make sure to include the Rating field
    } = req.body;

    // Get total attendance for the program
    const totalAttendance = await Attendance.count({
      where: { ProgramID: programId }
    });

    const feedback = await Feedback.create({
      ProgramID: programId,
      fullName,
      email,
      serviceName,
      sessionDate,
      constructiveFeedback,
      uncertainties,
      recommend,
      additionalComments,
      Rating: rating, // Ensure the Rating is included in the feedback creation
      TotalAttendance: totalAttendance,
    });

    res.status(201).json(feedback);
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Error submitting feedback', error });
  }
};

exports.getProgramAttendanceForToday = async (req, res) => {
  const { programId } = req.params;

  try {
    const startOfDay = moment().tz('Africa/Kigali').startOf('day').toDate();
    const endOfDay = moment().tz('Africa/Kigali').endOf('day').toDate();

    const attendanceCount = await Attendance.count({
      where: {
        ProgramID: programId,
        createdAt: {
          [Op.between]: [startOfDay, endOfDay]
        }
      }
    });

    res.status(200).json({ count: attendanceCount });
  } catch (error) {
    console.error('Error fetching today\'s attendance:', error);
    res.status(500).json({ message: 'Error fetching today\'s attendance', error });
  }
};
