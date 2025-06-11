const express = require('express'); // Loads Express framework
const mongoose = require('mongoose'); // Connects to MongoDB
const dotenv = require('dotenv'); // Allows you to use the .env file

dotenv.config(); // Load the .env file so you can use `process.env.JWT_SECRET` etc.

const authRoutes = require('./routes/auth'); // Load auth-related routes
const messageRoutes = require('./routes/messages'); // Load message routes

const app = express(); // Create the Express app
app.use(express.json()); // Tells Express to accept JSON in request bodies

// Register the routes
app.use('/auth', authRoutes);
app.use('/messages', messageRoutes);

// Connect to the database and start the server
mongoose.connect(process.env.MONGO_URI_ATLAS)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));
  })
  .catch(err => console.error('❌ Mongo Error:', err));

