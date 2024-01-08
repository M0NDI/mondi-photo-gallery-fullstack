const isAuthenticated = (req, res, next) => {
    const userData = req.signedCookies.token;
  
    if (userData) {
      // User is authenticated
      console.log('there is a user')
      next();
    } else {
      // User is not authenticated
      res.status(401).json({ error: "Unauthorized" });
    }
  };
  
  module.exports = isAuthenticated;