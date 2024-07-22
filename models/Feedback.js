module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    FeedbackID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FamilyID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Families',
        key: 'FamilyID',
      },
    },
    ContentID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Contents',
        key: 'ContentID',
      },
    },
    ProgramID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Programs',
        key: 'ProgramID',
      },
    },
    Rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Comments: {
      type: DataTypes.STRING,
    },
    TeachingExperience: {
      type: DataTypes.STRING,
    },
    TotalAttendance: {
      type: DataTypes.INTEGER,
    },
    CoursesTaught: {
      type: DataTypes.STRING,
    },
    sessionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    constructiveFeedback: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uncertainties: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recommend: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    additionalComments: {
      type: DataTypes.STRING,
    },
    Date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  Feedback.associate = function(models) {
    Feedback.belongsTo(models.Family, { foreignKey: 'FamilyID' });
    Feedback.belongsTo(models.Content, { foreignKey: 'ContentID' });
    Feedback.belongsTo(models.Program, { foreignKey: 'ProgramID' });
  };

  return Feedback;
};
