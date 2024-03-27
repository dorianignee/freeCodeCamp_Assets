const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

// Express server configuration
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
app.use('/api/users', bodyparser.urlencoded({ extended: false }));

// Mongoose configuration
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose.connect(process.env.MONGO_URI, clientOptions);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  log: {
    type: 
    [{
      description: { type: String, required: true },
      duration: { type: Number, required: true, min: 1 },
      date: { type: Date, required: true }
    }],
    default: []
  }
});

const User = mongoose.model('User', userSchema);

/***** Api connectors *****/

// POST /api/users/:_id/exercises creates a new exercise for existing user
app.post("/api/users/:_id/exercises", (req, res, next) => {
  const description = req.body.description;
  const duration = Number(req.body.duration);

  if (!description || description === "") return res.send("description is required");
  else if (!duration || isNaN(duration) || duration < 1) return res.send("duration must be a number larger than 0");

  User
    .findById(req.params._id)
    .then(user => {
      if (!user) return res.send("User with id " + req.params._id + " not found!");
        
      req.user = user;
      next();
    })
    .catch(err => res.send("User with id " + req.params._id + " not found!"));
}, (req, res) => {
  const user = req.user;
  const date = req.body.date ? new Date(req.body.date): new Date();
  if (isNaN(date)) return res.send("Date could not be parsed.");

  user.log.push({
    description: req.body.description,
    duration: req.body.duration,
    date
  });

  user
    .save()
    .then(updatedUser => {
      res.json({
        "username": updatedUser.username,
        "description": req.body.description,
        "duration": req.body.duration,
        "date": date.toDateString(),
        "_id": updatedUser._id
      })
    });
});

// POST /api/users creates a new user or returns an existing user
app.post("/api/users", (req, res, next) => {
  const username = req.body.username;
  if (!username || username === "") return res.send("username is required.");

  // check if user already exists
  User
    .findOne({username: username})
    .then(user => {
      if (user) {
        res.json({ "username": user.username, "_id": user._id });
      } else {
        // Save new user
        const newUser = new User({username});
        newUser
          .save()
          .then(newUser => res.json({ "username": newUser.username, "_id": newUser._id }));
        
      }
    })
}, (req, res) => {
  // insert new user and return user object
  const user = req.user;
  user
    .save()
    .then(newUser => res.json({ "username": newUser.username, "_id": newUser._id }));
});

// GET /api/users returns a list of all users
app.get('/api/users', (req, res) => {
  User
    .find()
    .then(users => {
      res.json(users.map(user => ({ "username": user.username, "_id": user._id })));
    })
})

// GET /api/users/:_id/logs returns a list of excercises of the user
// optional parameters: from (date), to (date), limit (number)
app.get('/api/users/:_id/logs', (req, res) => {
  User
    .findById(req.params._id)
    .then(user => {
      if (!user) return res.json({"error": "User with id " + req.params._id + " not found!"});

      let logs = user.log;
      
      // filter from date
      if (req.query.from) {
        const fromDate = new Date(req.query.from);
        if (isNaN(fromDate)) return res.json({"error": "from date could not be parsed"});
        logs = logs.filter(exercise => new Date(exercise.date.toDateString()) >= new Date(fromDate.toDateString()));
      }

      // filter to date
      if (req.query.to) {
        const toDate = new Date(req.query.to);
        if (isNaN(toDate)) return res.json({"error": "to date could not be parsed"});
        logs = logs.filter(exercise => new Date(exercise.date.toDateString()) <= new Date(toDate.toDateString()));
      }

      // limit
      if (req.query.limit) {
        const limit = Number(req.query.limit);
        if (isNaN(limit)) return res.json({"error": "limit is not a valid number"});
        logs = logs.slice(0,limit);
      }

      // return data
      res.json({
        "username": user.username,
        "count": logs.length,
        "_id": user._id,
        "log": logs.map(exercise => ({
          "description": exercise.description,
          "duration": exercise.duration,
          "date": exercise.date.toDateString()
        }))
      });
    })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
