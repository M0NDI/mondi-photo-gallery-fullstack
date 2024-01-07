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

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJwt({ payload: user });
  const tokenValue = token;
  res.cookie("token", tokenValue, {
    httpOnly: true,
    expiresIn: "1h",
  });
  res.status(200).json({
    status: 200,
    success: true,
    msg: "Successfully logged in",
    token: tokenValue,
  });
};

module.exports = {
  createJwt,
  isTokenValid,
  attachCookiesToResponse,
};