const express = require("express");
const router = express.Router();

const authverify = require("../Controllers/Middleware/Verify");
const userverify = require("./Middleware/UserId");
const rooms = require("../Models/HotelModel");
const bookings = require("../Models/BookingModel");

router.post("/booking", authverify, userverify, (req, res) => {
  const userid = req.uniqueId;

  const roomid = req.headers._id;

  const room = rooms
    .findOne({ _id: roomid })
    .then((result) => {
      if (result) {
        const newbooking = new bookings({
          bookeduser: userid,
          roomid: roomid,
          stat: req.body,
        });
        newbooking
          .save()
          .then((result) => {
            res.json({ message: "created" });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "something went wrong" });
          });
      } else {
        res.status(400).json({ message: "no room ofund" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    });
});

router.get("/booking", authverify, userverify, (req, res) => {
  bookings
    .find()
    .populate("bookeduser")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    });
});

module.exports = router;
