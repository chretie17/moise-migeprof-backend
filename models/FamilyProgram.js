module.exports = (sequelize, DataTypes) => {
  const FamilyProgram = sequelize.define('FamilyProgram', {
    FamilyID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Families',
        key: 'FamilyID'
      }
    },
    ProgramID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Programs',
        key: 'ProgramID'
      }
    },
    StartDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return FamilyProgram;
};
