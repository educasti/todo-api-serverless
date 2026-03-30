const TaskModel = require('../models/task.model');

const TaskController = {
  getAll: (req, res) => {
    const tasks = TaskModel.findAll();
    res.json({ data: tasks, count: tasks.length });
  },

  getById: (req, res) => {
    const task = TaskModel.findById(Number(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ data: task });
  },

  create: (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const task = TaskModel.create({ title });
    res.status(201).json({ data: task });
  }
};

module.exports = TaskController;