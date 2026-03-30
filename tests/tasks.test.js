const request = require('supertest');
const app = require('../src/index');
const TaskModel = require('../src/models/task.model');

// Antes de cada test, limpia el estado en memoria
beforeEach(() => {
  TaskModel.reset();
});

describe('POST /tasks', () => {
  it('should create a task with valid title', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Aprender Jest' });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.title).toBe('Aprender Jest');
    expect(res.body.data.completed).toBe(false);
    expect(res.body.data.id).toBeDefined();
  });

  it('should return 400 if title is missing', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Title is required');
  });
});

describe('GET /tasks', () => {
  it('should return empty array when no tasks exist', async () => {
    const res = await request(app).get('/tasks');

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toEqual([]);
    expect(res.body.count).toBe(0);
  });

  it('should return all created tasks', async () => {
    await request(app).post('/tasks').send({ title: 'Tarea 1' });
    await request(app).post('/tasks').send({ title: 'Tarea 2' });

    const res = await request(app).get('/tasks');

    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBe(2);
    expect(res.body.data[0].title).toBe('Tarea 1');
  });
});

describe('GET /tasks/:id', () => {
  it('should return a task by id', async () => {
    await request(app).post('/tasks').send({ title: 'Tarea encontrable' });

    const res = await request(app).get('/tasks/1');

    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe('Tarea encontrable');
  });

  it('should return 404 if task does not exist', async () => {
    const res = await request(app).get('/tasks/999');

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Task not found');
  });
});

describe('GET /health', () => {
  it('should return status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});