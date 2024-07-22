module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    AttendanceID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ProgramID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Programs',
        key: 'ProgramID'
      }
    },
    FamilyID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Families',
        key: 'FamilyID'
      }
    },
    Date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Attendance.associate = function(models) {
    Attendance.belongsTo(models.Program, { foreignKey: 'ProgramID' });
    Attendance.belongsTo(models.Family, { foreignKey: 'FamilyID' });
  };

  return Attendance;
};
