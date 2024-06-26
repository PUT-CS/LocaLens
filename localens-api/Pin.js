const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
    photo: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    collection: "localens",
  },
);

module.exports = mongoose.model("Pin", PinSchema);
