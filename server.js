const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Optional: Use CORS to enable cross-origin requests

const app = express();
const port = process.env.PORT || 3000; // You can specify the desired port

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS (for cross-origin requests)

// Connect to MongoDB (replace 'your-database-name' with your actual database name)
mongoose.connect('mongodb://localhost:27017/Dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model for your data
const dataSchema = new mongoose.Schema({
  // Define your schema fields here
  // Example:
  name: String,
  age: Number,
});

const DataModel = mongoose.model('Data', dataSchema);

// Create an API endpoint to fetch data
app.get('/api/data', async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
