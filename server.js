// app.js
const express = require('express');
const mongoose = require("mongoose");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080; // Use port 3000 by default


// Define a MongoDB schema and model (using Mongoose)
const SongSchema = new mongoose.Schema({
    song: String,
    singer: String,
    lang: String,
    user: String,
    date_added: String,
    like: Number,
    sung: Number,
    tags: [String],
});

// Create a model for the Item collection
const Item = mongoose.model("Item", SongSchema, "ktv");

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/web", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });


// Serve static files from the 'public' directory
app.use(express.static(__dirname));


app.get("/songs", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
