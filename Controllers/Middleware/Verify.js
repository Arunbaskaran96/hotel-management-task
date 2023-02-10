const jwt = require("jsonwebtoken");
const secret = "Arun";

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    const verify = jwt.verify(req.headers.authorization, secret);

    if (verify) {
      req.Token = verify;
      next();
    } else {
      res.status(400).json({ message: "Auth denied" });
    }
  } else {
    res.status(400).json({ message: "Auth denied" });
  }
};
