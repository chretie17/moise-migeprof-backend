const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const userRoutes = require('./routes/user');
const familyRoutes = require('./routes/family');
const programRoutes = require('./routes/program');
const attendanceRoutes = require('./routes/attendance');
const contentRoutes = require('./routes/content');
const feedbackRoutes = require('./routes/feedback');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/families', familyRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/attendances', attendanceRoutes);
app.use('/api/contents', contentRoutes);
app.use('/api/feedback', feedbackRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.log('Error connecting to the database', error);
  });
