const createTokenUser = (user) => {
  return { username: user.username, email: user.email, id: user._id, role: user.role };
};

module.exports = createTokenUser;