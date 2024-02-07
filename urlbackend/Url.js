const mongoose = require("mongoose");

// const shortenedUrlSchema = new mongoose.Schema({
//   originalUrl: {
//     type: String,
//     required: true,
//   },
//   shortCode: {
//     type: String,
//     required: true,
//   },
//   // analytics: analyticsSchema,
// });

const UrlSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    // required: true,
  },
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
  shortenedUrl: {
    type: String,
  },
  // date: {
  //   type: String,
  //   default: Date.now,
  // },
  // userId:{
  //   type: mongoose.
  // }
  // shortenedUrls: [shortenedUrlSchema],
});

module.exports = mongoose.model("Url", UrlSchema);
