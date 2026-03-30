let tasks = [];
let nextId = 1;

const TaskModel = {
  findAll: () => tasks,

  findById: (id) => tasks.find(t => t.id === id),

  create: (data) => {
    const task = {
      id: nextId++,
      title: data.title,
      completed: false,
      createdAt: new Date().toISOString()
    };
    tasks.push(task);
    return task;
  },

  reset: () => { tasks = []; nextId = 1; }
};

module.exports = TaskModel;