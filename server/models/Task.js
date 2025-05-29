const { request } = require('express');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  status: { type: String, required: true, default: 'Not Started' },
  priority:{type: String, required: true},
  time: { type: String, required: true },
  date: { type: Date, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
});

module.exports = mongoose.model('Task', taskSchema);
