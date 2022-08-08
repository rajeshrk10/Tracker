import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateTask extends Component {
  constructor(props) {
    super(props);

    this.onChangeTaskname = this.onChangeTaskname.bind(this);
    this.onChangeTechnology = this.onChangeTechnology.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      taskname: '',//assigning the task name as empty
      technology: '',//assigning the technology as empty
      duration: 0,//assigning the duration as 0
      date: new Date(),
      users: []
    }
  }

 

  onChangeTaskname(e) {//function to change the task name using setState
    this.setState({
      taskname: e.target.value
    })
  }

  onChangeTechnology(e) {//function to change the technology using setState
    this.setState({
      technology: e.target.value
    })
  }

  onChangeDuration(e) {//function to change the duration using setState
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {//function to change the date using setState
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const task = {
      taskname: this.state.taskname,
      technology: this.state.technology,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(task);

    axios.post('http://localhost:5000/tasks/add', task)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New Task</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Task name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.taskname}
              onChange={this.onChangeTaskname}
              />
        </div>
        <div className="form-group"> 
          <label>Technology: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.technology}
              onChange={this.onChangeTechnology}
              />
        </div>
        <div className="form-group">
          <label>Duration (in days): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>
        <br/>
        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}