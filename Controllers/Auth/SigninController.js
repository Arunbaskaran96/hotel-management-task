const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
const customers = require("../../Models/UserModel");

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    const user = new customers({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      city: req.body.city,
      mobile: req.body.mobile,
    });

    await user.save();
    res.status(200).json({ message: "user created" });
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
    console.log(error);
  }
});

module.exports = router;
