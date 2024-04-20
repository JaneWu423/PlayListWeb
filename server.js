// app.js
const express = require('express');
const mongoose = require("mongoose");
const { EventEmitter } = require("events");


const emitter = new EventEmitter();
const app = express();
const PORT = process.env.PORT || 8080; // Use port 3000 by default

// Middleware to parse JSON bodies
app.use(express.json());


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
const Item = mongoose.model("Item", SongSchema, "songs");

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

app.post("/add_songs", async (req, res) => {
  const { song, singer, lang, user, date_added, like, sung, tagsArray } =
    req.body;

  // Check required fields
  if (!song || !singer || !lang || !user) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    // Check if a song with the same name and singer already exists
    const existingItem = await Item.findOne({ song, lang });

    if (
      existingItem &&
      (!existingItem.singer || existingItem.singer === singer ||
        existingItem.singer === "")
    ) {
      let inc = 1;
      if (existingItem.user !== user) {
        inc = 2;
      }
      //   modify the like field of the item to increment 1
      const updatedItem = await Item.findOneAndUpdate(
        { song, singer, lang },
        { $inc: { like: inc } },
        { new: true }
      );
      res.status(200).json(updatedItem);
      emitter.emit("update", {
        message: "New update available",
        data: updatedItem,
      });
      return;
    }

    // Create a new song document if no duplicate is found
    const newSong = new Item({
      song,
      singer,
      lang,
      user,
      date_added,
      like,
      sung,
      tagsArray,
    });

    const newItem = await newSong.save();
    res.status(201).json(newItem);
    emitter.emit("update", { message: "New update available", data: newItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to subscribe to SSE updates
app.get('/updates', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  const sendUpdate = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Subscribe to 'update' events
  const updateListener = (data) => {
    sendUpdate(data);
  };
  emitter.on('update', updateListener);

  // Remove update listener when client disconnects
  req.on('close', () => {
    emitter.removeListener('update', updateListener);
  });
});

// // Endpoint to trigger updates (for demonstration)
// app.post('/trigger-update', (req, res) => {
//   // Emit 'update' event to all connected clients
// });

app.post("/add_songs", async (req, res) => {
    const item = new Item({
        song: req.body.song,
        singer: req.body.singer,
        lang: req.body.lang,
        user: req.body.user,
        date_added: req.body.date_added,
        like: req.body.like,
        sung: req.body.sung,
        tags: req.body.tags,
    });
    
    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
