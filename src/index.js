const express = require('express');
const taskRoutes = require('./routes/task.routes');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Todo API Serverless running' });
});

app.use('/tasks', taskRoutes);

module.exports = app;