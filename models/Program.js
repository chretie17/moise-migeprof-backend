module.exports = (sequelize, DataTypes) => {
  const Program = sequelize.define('Program', {
    ProgramID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ProgramName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Thumbnail: {
      type: DataTypes.BLOB('long'),
      allowNull: true
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  Program.associate = function(models) {
    Program.hasMany(models.Attendance, { foreignKey: 'ProgramID' });
    Program.hasMany(models.Content, { foreignKey: 'ProgramID' });
    Program.belongsToMany(models.Family, { through: models.FamilyProgram, foreignKey: 'ProgramID' });
  };

  return Program;
};
