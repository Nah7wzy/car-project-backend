const express = require('express');
const CORS = require("cors");
const mongoose = require("mongoose");
require("dotenv/config"); //go to the .env file and change the database address for mongoose to work

const app = express();

//Route
const carsRoutes = require('./routes/cars');

//dbconnect
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to db");
  }
); 

app.use(express.json()); //to handle json format req and res
app.use(CORS());

//Middlewares for requests
app.use('/cars', carsRoutes);

// an envt variable called PORT, for production
const port = process.env.PORT || 5000;
app.listen(port, () => {console.log(`Listening on port ${port}`)});