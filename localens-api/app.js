require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const Pin = require("./Pin");
require("./db");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// Define your valid API keys (You can store these in a secure way, such as environment variables)
// Middleware to verify API key
const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey != process.env.LOCALENS_API_KEY) {
    return res.status(401).json({ message: "Unauthorized - Invalid API key" });
  }
  next();
};

// Apply API key verification middleware to all routes
app.use(verifyApiKey);

// GET all pins
app.get("/pins", async (req, res) => {
  try {
    const pins = await Pin.find();
    console.info(pins);
    res.json(pins);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// POST a new pin
app.post("/pins", async (req, res) => {
  console.log(req.body);
  const { userEmail, lat, long, description, photo } = req.body;
  try {
    const newPin = new Pin({ userEmail, lat, long, photo, description });
    console.log(newPin);
    await newPin.save();
    res.status(201).json(newPin);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// GET pins between given coordinates
app.get("/pins/bounds", async (req, res) => {
  const { minLat, maxLat, minLong, maxLong } = req.query;
  try {
    //console.log(minLat, maxLat, minLong, maxLong);
    const pins = await Pin.find({
      lat: { $gte: minLat, $lte: maxLat },
      long: { $gte: minLong, $lte: maxLong },
    });
    res.json(pins);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// GET pins of a specific user
app.get("/pins/user", async (req, res) => {
  const { userEmail } = req.query;
  try {
    const pins = await Pin.find({ userEmail });
    res.json(pins);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

try {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (e) {
  console.error(e);
}
