const { Attendance, Content, Family, Feedback, Program, User } = require('../models');
const { Parser } = require('json2csv');
const moment = require('moment');

// Function to handle field agents report
exports.getFieldAgentsReport = async (req, res) => {
  try {
    const users = await User.findAll({ where: { Role: 'field-agent' } });
    const data = users.map(user => ({
      ID: user.UserID,
      Name: user.Username,
      Email: user.Email || 'N/A',
      Role: user.Role,
      CreatedAt: moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss'),
    }));
    res.status(200).json(data.length > 0 ? data : []);
  } catch (error) {
    console.error('Error generating field agents report:', error);
    res.status(500).json({ message: 'Error generating field agents report', error });
  }
};

// Function to handle programs and families report
exports.getProgramsAndFamiliesReport = async (req, res) => {
  try {
    const programs = await Program.findAll({
      include: [{ model: Family }],
    });
    const data = programs.map(program => ({
      ProgramID: program.ProgramID,
      ProgramName: program.ProgramName,
      Description: program.Description,
      Families: program.Families.map(family => ({
        FamilyID: family.FamilyID,
        FamilyHeadName: family.FamilyHeadName,
        Address: family.Address,
        NumberOfMembers: family.NumberOfMembers,
        IncomeLevel: family.IncomeLevel,
        EducationLevel: family.EducationLevel,
        Province: family.Province,
        District: family.District,
        Sector: family.Sector,
        Cell: family.Cell,
        Village: family.Village,
        CreatedAt: moment(family.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      })),
    }));
    console.log('Programs and Families Data:', data); // Debugging log
    res.status(200).json(data.length > 0 ? data : []);
  } catch (error) {
    console.error('Error generating programs and families report:', error);
    res.status(500).json({ message: 'Error generating programs and families report', error });
  }
};

// Function to handle contents report
exports.getContentsReport = async (req, res) => {
  try {
    const contents = await Content.findAll({
      include: [{ model: Program, attributes: ['ProgramName'] }],
    });
    const data = contents.map(content => ({
      ContentID: content.ContentID,
      Title: content.Title,
      Description: content.Description,
      ProgramName: content.Program ? content.Program.ProgramName : 'N/A',
      CreatedAt: moment(content.createdAt).format('YYYY-MM-DD HH:mm:ss'),
    }));
    console.log('Contents Data:', data); // Debugging log
    res.status(200).json(data.length > 0 ? data : []);
  } catch (error) {
    console.error('Error generating contents report:', error);
    res.status(500).json({ message: 'Error generating contents report', error });
  }
};

// Function to handle feedback report
exports.getFeedbackReport = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({
      include: [{ model: Program, attributes: ['ProgramName'] }],
    });
    const data = feedbacks.map(feedback => ({
      FeedbackID: feedback.FeedbackID,
      FullName: feedback.fullName,
      Email: feedback.email || 'N/A',
      ProgramName: feedback.Program ? feedback.Program.ProgramName : 'N/A',
      Rating: feedback.Rating,
      Comments: feedback.Comments,
      SessionDate: moment(feedback.sessionDate).format('YYYY-MM-DD'),
      CreatedAt: moment(feedback.createdAt).format('YYYY-MM-DD HH:mm:ss'),
    }));
    console.log('Feedback Data:', data); // Debugging log
    res.status(200).json(data.length > 0 ? data : []);
  } catch (error) {
    console.error('Error generating feedback report:', error);
    res.status(500).json({ message: 'Error generating feedback report', error });
  }
};

// Function to handle detailed feedback report
exports.getDetailedFeedbackReport = async (req, res) => {
  const { feedbackID } = req.params;
  try {
    const feedback = await Feedback.findByPk(feedbackID, {
      include: [{ model: Program, attributes: ['ProgramName'] }],
    });
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    const data = {
      FeedbackID: feedback.FeedbackID,
      FullName: feedback.fullName,
      Email: feedback.email || 'N/A',
      ProgramName: feedback.Program ? feedback.Program.ProgramName : 'N/A',
      Rating: feedback.Rating,
      Comments: feedback.Comments,
      SessionDate: moment(feedback.sessionDate).format('YYYY-MM-DD'),
      CreatedAt: moment(feedback.createdAt).format('YYYY-MM-DD HH:mm:ss'),
    };
    console.log('Detailed Feedback Data:', data); // Debugging log
    res.status(200).json(data);
  } catch (error) {
    console.error('Error generating detailed feedback report:', error);
    res.status(500).json({ message: 'Error generating detailed feedback report', error });
  }
};

// Function to get all feedback IDs
exports.getAllFeedbackIDs = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({ attributes: ['FeedbackID'] });
    const ids = feedbacks.map(feedback => feedback.FeedbackID);
    res.status(200).json(ids);
  } catch (error) {
    console.error('Error fetching feedback IDs:', error);
    res.status(500).json({ message: 'Error fetching feedback IDs', error });
  }
};
