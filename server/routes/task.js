const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/fetchTasks/:userId', async (req, res) => {
  console.log("inside fetchTasks:::::");
  const {userId} = req.params;
  console.log(userId);
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
    console.log(tasks); 
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Add new task
router.post('/addNewTask/:userId', async (req, res) => {
  console.log("inside addnewtask");
  const { task, priority, time, date } = req.body;
  console.log("priority:::::::",priority);
  const {userId} = req.params;
  console.log("userId",userId);
  
  try {
    const newTask = new Task({ task, priority, time, date ,userId}); // Adjust to match your Mongoose schema
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not add task' });
  }
});


// Update task
router.put('/:id', async (req, res) => {
  const { text, completed } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { text, completed }, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Could not update task' });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete task' });
  }
});

module.exports = router;
