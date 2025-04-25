const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Create new task
router.post('/', taskController.createTask);

// Get all tasks
router.get('/', taskController.getAllTasks);

// Update task
router.put('/:id', taskController.updateTask);

// Delete task
router.delete('/:id', taskController.deleteTask);

module.exports = router;