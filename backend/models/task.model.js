const mongoose = require('mongoose'); //importing mongoose

const Schema = mongoose.Schema;//using Schema which is in Mongoose module

const taskSchema = new Schema({
  taskname: { type: String, required: true },//assigning  string type and required for taskname
  technology: { type: String, required: true },//assigning  string type and required for technology
  duration: { type: Number, required: true },//assigning  string type and required for duration
  date: { type: Date, required: true },//assigning  string type and required for date
}, {
  timestamps: true,//setting time stamp to true so that the created time will shown automatically
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;