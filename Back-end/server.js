const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());  // Allow cross-origin requests (important if frontend and backend are on different ports)
app.use(bodyParser.json());  // Parse JSON request bodies

// Dummy in-memory user store (replace this with a real database in production)
let users = [];

// Registration Route
app.post('/api/auth/register', (req, res) => {
  const { email, username, password } = req.body;

  // Basic validation (in a real app, you would hash passwords and validate data)
  if (!email || !username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if the user already exists
  const userExists = users.some(user => user.email === email || user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'User with this email or username already exists' });
  }

  // Create the user (this would normally go into a database)
  const newUser = { email, username, password };
  users.push(newUser);

  // Respond with success message
  res.status(201).json({ message: 'User registered successfully' });
});

// Login Route
app.post('/api/auth/login', (req, res) => {
  const { emailOrUsername, password } = req.body;

  // Find user by email or username
  let user;
  
  if (emailOrUsername.includes('@')) {
    // Check if it's an email
    user = users.find(user => user.email === emailOrUsername);
  } else {
    // Otherwise, assume it's a username
    user = users.find(user => user.username === emailOrUsername);
  }

  // If no user is found, return an error
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Check if the password is correct
  
  if (user.password !== password) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // Successful login
  res.status(200).json({ message: 'Login successful' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
