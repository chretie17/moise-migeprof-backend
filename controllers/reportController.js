const { Attendance, Content, Family, Feedback, Program, sequelize } = require('../models');
const { Parser } = require('json2csv');

exports.getAdminReport = async (req, res) => {
  try {
    const attendances = await Attendance.findAll({
      include: [{ model: Program, attributes: ['ProgramName'] }, { model: Family, attributes: ['FamilyHeadName'] }]
    });
    const contents = await Content.findAll({
      include: [{ model: Program, attributes: ['ProgramName'] }]
    });
    const families = await Family.findAll({
      include: [{ model: Program, through: { attributes: [] }, attributes: ['ProgramName'] }]
    });

    const data = {
      attendances: attendances.map(a => ({
        ID: a.AttendanceID,
        Program: a.Program.ProgramName,
        Family: a.Family.FamilyHeadName,
        Status: a.Status,
        Date: a.createdAt
      })),
      contents: contents.map(c => ({
        ID: c.ContentID,
        Program: c.Program.ProgramName,
        Title: c.Title,
        Description: c.Description,
        Date: c.createdAt
      })),
      families: families.map(f => ({
        ID: f.FamilyID,
        FamilyHead: f.FamilyHeadName,
        Address: f.Address,
        Members: f.NumberOfMembers,
        Program: f.Programs.map(p => p.ProgramName).join(', ')
      }))
    };

    // Create CSV
    const parser = new Parser();
    const csv = parser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('admin_report.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Error generating report' });
  }
};

exports.getFieldAgentStats = async (req, res) => {
  try {
    const programStats = await Program.findAll({
      attributes: [
        'ProgramID',
        'ProgramName',
        [sequelize.fn('COUNT', sequelize.col('Attendances.AttendanceID')), 'attendanceCount']
      ],
      include: [{
        model: Attendance,
        attributes: []
      }],
      group: ['Program.ProgramID']
    });

    const contentStats = await Content.findAll({
      attributes: [
        'ProgramID',
        [sequelize.fn('COUNT', sequelize.col('ContentID')), 'contentCount']
      ],
      include: [{
        model: Program,
        attributes: ['ProgramName']
      }],
      group: ['ProgramID']
    });

    const familyStats = await Family.count();

    res.status(200).json({
      programStats,
      contentStats,
      familyStats
    });
  } catch (error) {
    console.error('Error fetching field agent stats:', error);
    res.status(500).json({ message: 'Error fetching field agent stats', error });
  }
};
exports.getDashboardStats = async (req, res) => {
    try {
      const totalPrograms = await Program.count();
      const totalContents = await Content.count();
      const totalFamilies = await Family.count();
      const totalAttendances = await Attendance.count();
      
      const averageFeedbackRating = await Feedback.findAll({
        attributes: [[sequelize.fn('AVG', sequelize.col('Rating')), 'avgRating']],
        raw: true,
      });
  
      const attendanceByProgram = await Attendance.findAll({
        attributes: [
          'Program.ProgramID',
          [sequelize.fn('COUNT', sequelize.col('Attendance.ProgramID')), 'AttendanceCount']
        ],
        include: [
          {
            model: Program,
            attributes: ['ProgramID', 'ProgramName'],
          }
        ],
        group: ['Program.ProgramID'],
        raw: true,
      });
  
      const feedbackByRating = await Feedback.findAll({
        attributes: ['Rating', [sequelize.fn('COUNT', sequelize.col('Rating')), 'Count']],
        group: ['Rating'],
      });
  
      res.status(200).json({
        totalPrograms,
        totalContents,
        totalFamilies,
        totalAttendances,
        averageFeedbackRating: averageFeedbackRating[0].avgRating,
        attendanceByProgram,
        feedbackByRating,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      res.status(500).json({ message: 'Error fetching dashboard stats', error });
    }
  };