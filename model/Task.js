const mongoose = require("mongoose");

var taskSchema = mongoose.Schema({
  title: String,
  done:Boolean,
  created_at:{type: Date, default: Date.now},
  updated_at:{type: Date, default: Date.now}
});

module.exports = mongoose.model("Task", taskSchema);
