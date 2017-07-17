const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

const userSchema = new Schema({
  firstname: { type: String, required: true},
  lastname : { type: String, required: true},
  gender : {type:String},
  topics: [{
        topic : {type:String}
  }]
},{collection:'user'});

module.exports = mongoose.model('User', userSchema);

