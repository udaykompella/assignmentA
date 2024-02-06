const jwt = require("jsonwebtoken");

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

      const currentUser = await User.findById(decoded.id);

      req.user = currentUser;
      next();
    } catch (error) {
      res.status(401).json({
        message: "Token is not valid",
      });
    }
  }
  // console.log(req.user, "req.user");
};
