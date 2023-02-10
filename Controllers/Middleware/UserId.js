const users = require("../../Models/UserModel");

module.exports = async (req, res, next) => {
  if (req.Token.email) {
    const user = await users.findOne({ email: req.Token.email });
    req.uniqueId = user._id;
    next();
  } else {
    res.status(400).json({ message: "user not found" });
  }
};
