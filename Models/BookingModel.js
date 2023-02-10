const mongoose = require("mongoose");

const BookModel = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

const BookinModel = mongoose.Schema({
  bookeduser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
    required: true,
  },
  roomid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hotel",
    required: true,
  },
  stat: BookModel,
});

module.exports = mongoose.model("booking", BookinModel);
