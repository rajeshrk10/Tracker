const express = require('express'); //importing express 
const cors = require('cors');// importing cors 
const mongoose = require('mongoose');//importing mongoose 

require('dotenv').config();//importing dotenv and configuring the .env file

const app = express();
const port = process.env.PORT || 5000;//assigning port

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;//getting database uri from the .env file
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;//connecting database
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})



const tasksRouter=require('./routes/tasks');

app.use('/tasks',tasksRouter);//adding the router imported from the tasks.js file to the db


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});