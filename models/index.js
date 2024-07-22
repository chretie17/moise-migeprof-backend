const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('migeprof', 'root', 'Admin@123', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = require('./User')(sequelize, DataTypes);
const Family = require('./Family')(sequelize, DataTypes);
const Program = require('./Program')(sequelize, DataTypes);
const Attendance = require('./Attendance')(sequelize, DataTypes);
const Content = require('./Content')(sequelize, DataTypes);
const Feedback = require('./Feedback')(sequelize, DataTypes);
const FamilyProgram = require('./FamilyProgram')(sequelize, DataTypes);

const models = {
  User,
  Family,
  Program,
  Attendance,
  Content,
  Feedback,
  FamilyProgram,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(error => {
    console.error('Error creating database & tables', error);
  });

module.exports = {
  sequelize,
  ...models,
};
