module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define('Content', {
    ContentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProgramID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Programs',
        key: 'ProgramID',
      },
    },
    Video: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
  });

  Content.associate = function(models) {
    Content.belongsTo(models.Program, { foreignKey: 'ProgramID' });
  };

  return Content;
};
