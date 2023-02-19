const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// enable CORS for all origins
app.use(cors());

// connect to MongoDB
mongoose.connect('mongodb+srv://ahmed:2463@cluster0.cbgf0hm.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error(err);
});

// define a User model
const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// define routes
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    // if user is not found, return an error response
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // check if the password is correct
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    // if password is not correct, return an error response
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // if email and password are correct, return a success response
  res.status(200).json({ message: 'Login successful' });
});

// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
