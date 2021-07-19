const jwt = require("jsonwebtoken");
const config = require('../../config/config');

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["promo-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.jwt_key);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;