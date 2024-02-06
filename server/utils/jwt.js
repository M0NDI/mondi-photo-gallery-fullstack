const jwt = require("jsonwebtoken");

const createJwt = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  return token;
};

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJwt({ payload: user });
  const tokenValue = token;
  res.cookie("token", tokenValue, {
    httpOnly: true,
    expiresIn: process.env.JWT_EXPIRATION,
    signed: true,
    secure: process.env.ENVIRONMENT === "production", // Set secure flag only in production
    domain: ".onrender.com",
  });
};

const isTokenValid = ({ token }) => {
  const valid = jwt.verify(token, process.env.JWT_SECRET);
  return valid;
};

module.exports = {
  createJwt,
  isTokenValid,
  attachCookiesToResponse,
};
