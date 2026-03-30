const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/task.controller');

router.get('/',    TaskController.getAll);
router.get('/:id', TaskController.getById);
router.post('/',   TaskController.create);

module.exports = router;