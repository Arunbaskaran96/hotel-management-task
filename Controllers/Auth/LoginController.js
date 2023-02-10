const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_secret = "Arun";

const customers = require("../../Models/UserModel");

router.post("/login", async (req, res) => {
  const user = await customers.findOne({ email: req.body.email });
  if (user) {
    const compare = await bcrypt.compare(req.body.password, user.password);
    if (compare) {
      const details = {
        email: user.email,
        _id: user._id,
      };
      const token = jwt.sign(details, jwt_secret, { expiresIn: "50m" });
      res.status(200).json({ message: "user found", token });
    } else {
      res.status(400).json({ message: "incorrect username/password" });
    }
  } else {
    res.status(400).json({ message: "no user found" });
  }
});

module.exports = router;
