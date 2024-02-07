const jwt = require("jsonwebtoken");
const User = require("./User");

module.exports = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(401).json({
      status: "fail",
      message: "Access denied",
    });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded.id, "decodedtoken");
      const currentUser = await User.findById(decoded.id);
      // console.log(currentUser, "currentuser");
      req.user = currentUser;
      next();
    } catch (error) {
      console.log(error, "err");
      res.status(401).json({
        message: "Token is not valid",
      });
    }
  }
  // console.log(req.user, "req.user");
};
