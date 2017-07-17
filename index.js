const express = require('express'); // Fast, unopinionated, minimalist web framework for node.
const app = express(); // Initiate Express Application
const router = express.Router(); // Creates a new router object.
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise;
const config = require('./config/database'); // Mongoose Config
const path = require('path'); // NodeJS Package for file paths

const authentication = require('./routes/authentication')(router); // Import Authentication Routes
const bodyParser = require('body-parser');

const cors = require('cors');
const port =8080; 

// Database Connection
mongoose.connect(config.uri, (err) => {
  // Check if database was able to connect
  if (err) {
    console.log('Could NOT connect to database: ', err); // Return error message
  } else {
    console.log('Connected to database: ' + config.db); // Return success message
  }
});

app.use(cors({ origin: 'http://localhost:4200' })); // Allows cross origin in development only
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use(express.static(__dirname + '/public')); // Provide static directory for frontend
app.use('/authentication', authentication); // Use Authentication routes in application

// Connect server to Angular 2 Index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});


// Start Server: Listen on port 8080
app.listen(port, () => {
  console.log('Listening on port ' + port);
});