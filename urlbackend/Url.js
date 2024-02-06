const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  // urlId: {
  //   type: String,
  //   required: true,
  // },
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    // required: true,
    default: 0,
  },
  // date: {
  //   type: String,
  //   default: Date.now,
  // },
  // userId:{
  //   type: mongoose.
  // }
});

module.exports = mongoose.model("Url", UrlSchema);
