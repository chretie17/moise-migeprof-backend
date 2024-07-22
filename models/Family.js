module.exports = (sequelize, DataTypes) => {
  const Family = sequelize.define('Family', {
    FamilyID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    RegistrationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Family.associate = function(models) {
    Family.hasMany(models.Attendance, { foreignKey: 'FamilyID' });
    Family.hasMany(models.Feedback, { foreignKey: 'FamilyID' });
    Family.belongsToMany(models.Program, { through: models.FamilyProgram, foreignKey: 'FamilyID' });
  };

  return Family;
};
