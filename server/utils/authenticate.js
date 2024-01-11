const { isTokenValid } = require("../utils/jwt");

const authenticateUser = (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    if (token) {
      // User is authenticated
      const { username, id, role } = isTokenValid({ token });
      req.user = { username, id, role };
      next();
    } else {
      // User is not authenticated
      res.status(401).json({ error: "User authentication failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: error });
  }
};

const authorizeUserPermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: { errorMsg: "Unauthorized. User is not admin", status: 403 } });
    }
    console.log("admin authorised");
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizeUserPermissions,
};
