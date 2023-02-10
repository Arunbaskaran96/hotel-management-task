const mongoose = require("mongoose");

const Hotelmodel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  amenities: {
    type: Array,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Not Booked",
  },
});

module.exports = mongoose.model("hotel", Hotelmodel);
