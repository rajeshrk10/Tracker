import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditTask extends Component {
  constructor(props) {
    super(props);

    this.onChangeTaskname = this.onChangeTaskname.bind(this);
    this.onChangeTechnology = this.onChangeTechnology.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      taskname: '',
      technology: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/tasks/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          taskname: response.data.taskname,
          technology: response.data.technology,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.taskname),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeTaskname(e) {
    this.setState({
      taskname: e.target.value
    })
  }

  onChangeTechnology(e) {
    this.setState({
      technology: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
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

    axios.post('http://localhost:5000/tasks/update/' + this.props.match.params.id, task)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Task</h3>
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
          <input type="submit" value="Edit Task Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}