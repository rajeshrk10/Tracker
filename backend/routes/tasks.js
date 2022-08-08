const router = require('express').Router();//importing express router to route the task file
let Task = require('../models/task.model');//importing the schema created for task

router.route('/').get((req, res) => {//if the url ends with '/' fetch all data 
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {// if the url ends with '/add' add task in server

  const taskname = req.body.taskname;// fetching taskname from schema created

  const technology = req.body.technology;//fetching technology from schema created

  const duration = Number(req.body.duration);//fetching duration from schema created

  const date = Date.parse(req.body.date);//fetching date from schema created

  const newTask = new Task({//adding taskname,technology,duration and date in a new variable by creating object
    taskname,
    technology,
    duration,
    date,
  });

  newTask.save()//if newTask is true and have value
  .then(() => res.json('Task added!'))//add task
  .catch(err => res.status(400).json('Error: ' + err));//if not show error
});

router.route('/:id').get((req, res) => {// find specific task using its id
  Task.findById(req.params.id)
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {// deleting specific task using its id
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json('Task deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {// updating specific task using its id
  Task.findById(req.params.id)
    .then(task => {
      task.taskname = req.body.taskname;
      task.technology = req.body.technology;
      task.duration = Number(req.body.duration);
      task.date = Date.parse(req.body.date);

      task.save()
        .then(() => res.json('Task updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;//exporting the router