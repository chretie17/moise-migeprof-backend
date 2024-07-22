module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    FeedbackID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    FamilyID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Families',
        key: 'FamilyID'
      }
    },
    ContentID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Contents',
        key: 'ContentID'
      }
    },
    Rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Comments: {
      type: DataTypes.STRING
    },
    Date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  Feedback.associate = function(models) {
    Feedback.belongsTo(models.Family, { foreignKey: 'FamilyID' });
    Feedback.belongsTo(models.Content, { foreignKey: 'ContentID' });
  };

  return Feedback;
};
