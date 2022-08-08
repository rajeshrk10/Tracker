import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";//importing bootstrap
import { BrowserRouter as Router, Route} from "react-router-dom";//importing BrowserRouter as Router, Route from react-router-dom 

import Navbar from "./components/navbar.component"//importing Navbar component
import TasksList from "./components/task-list.component";//importing TasksList component
import EditTask from "./components/edit-task.component";//importing EditTask component
import CreateTask from "./components/create-task.component";//importing CreateTask component


function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={TasksList} />
      <Route path="/edit/:id" component={EditTask} />
      <Route path="/create" component={CreateTask} />
     
      </div>
    </Router>
  );
}

export default App;