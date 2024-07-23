module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  });

  User.associate = function(models) {
    User.hasMany(models.Attendance, { foreignKey: 'UserID' });
    User.hasMany(models.Feedback, { foreignKey: 'UserID' });
  };

  return User;
};
