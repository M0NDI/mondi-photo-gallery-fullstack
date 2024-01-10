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
    expiresIn: "1h",
    signed: true,
  });
  res.status(200).json({
    status: 200,
    success: true,
    msg: "Successfully logged in",
    token: tokenValue,
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
