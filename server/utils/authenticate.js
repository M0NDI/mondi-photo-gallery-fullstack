const { isTokenValid } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    if (token) {
      // User is authenticated
      const { username, id, role } = isTokenValid({ token });
      req.user = {username, id, role}
      next();
    } else {
      // User is not authenticated
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ errorMessage: error });
  }
};

module.exports = authenticateUser;