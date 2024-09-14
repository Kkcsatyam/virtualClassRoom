// models/Class.js
const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sessions: [
    {
      title: String,
      lectures: [
        {
          title: String,
          content: String,
        },
      ],
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Class", ClassSchema);
