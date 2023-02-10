const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const hotels = require("../Models/HotelModel");
const auth = require("../Controllers/Middleware/Verify");

router.post("/hotel", (req, res) => {
  if (req) {
    const Hotel = new hotels({
      name: req.body.name,
      amenities: req.body.amenities,
      price: req.body.price,
      seats: req.body.seats,
    });

    Hotel.save()
      .then((result) => {
        res.status(200).json({ message: "created" });
      })
      .catch((er) => {
        res.status(500).json({ message: "something went wrong" });
        console.log(er);
      });
  } else {
    res.status(400).json({ message: "no data found" });
  }
});

router.get("/hotels", auth, (req, res) => {
  hotels
    .find()
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(200).json({ message: "no data found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    });
});

module.exports = router;
