const { Attendance, Content, Family, Feedback, Program, FamilyProgram } = require('../models');
const { sequelize } = require('../models'); // Import sequelize


exports.getDashboardStats = async (req, res) => {
  try {
    const totalAttendance = await Attendance.count();
    const attendanceByProgram = await Attendance.findAll({
      attributes: ['ProgramID', [sequelize.fn('COUNT', sequelize.col('ProgramID')), 'count']],
      group: ['ProgramID']
    });

    const totalContents = await Content.count();
    const contentsByProgram = await Content.findAll({
      attributes: ['ProgramID', [sequelize.fn('COUNT', sequelize.col('ProgramID')), 'count']],
      group: ['ProgramID']
    });

    const totalFamilies = await Family.count();
    const familiesByProgram = await FamilyProgram.findAll({
      attributes: ['ProgramID', [sequelize.fn('COUNT', sequelize.col('ProgramID')), 'count']],
      group: ['ProgramID']
    });

    const totalFeedbacks = await Feedback.count();
    const feedbackByRating = await Feedback.findAll({
      attributes: ['Rating', [sequelize.fn('COUNT', sequelize.col('Rating')), 'count']],
      group: ['Rating']
    });

    const totalPrograms = await Program.count();
    const activePrograms = await Program.count({ where: { IsActive: true } });

    res.status(200).json({
      attendanceStats: { totalAttendance, attendanceByProgram },
      contentStats: { totalContents, contentsByProgram },
      familyStats: { totalFamilies, familiesByProgram },
      feedbackStats: { totalFeedbacks, feedbackByRating },
      programStats: { totalPrograms, activePrograms }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error fetching dashboard stats', error });
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