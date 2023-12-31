const jwt = require("jsonwebtoken");

const createJwt = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  return token;
};

const isTokenValid = ({ token }) => {
  const valid = jwt.verify(token, process.env.JWT_SECRET);
  return valid;
};

module.exports = {
  createJwt,
  isTokenValid,
};