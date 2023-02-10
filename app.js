const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());

const HotelController = require("./Controllers/Hotelcontroller");
const SigninController = require("./Controllers/Auth/SigninController");
const LoginController = require("./Controllers/Auth/LoginController");
const BookingController = require("./Controllers/BookingController");

app.use("/", HotelController);
app.use("/", SigninController);
app.use("/", LoginController);
app.use("/", BookingController);
module.exports = app;
