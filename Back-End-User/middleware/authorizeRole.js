const jwt = require("jsonwebtoken");

function authorizeRole(roles = []) {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        throw new Error("Bạn chưa đăng nhập");
      }

      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

      if (decodedToken.role === "ADMIN") {
        req.user = decodedToken;
        return next();
      }

      if (!roles.includes(decodedToken.role)) {
        return res.status(403).json({
          message: "Bạn không có quyền truy cập",
          error: true,
        });
      }

      req.user = decodedToken;

      next();
    } catch (error) {
      res.status(403).json({
        message: error.message || "Không có quyền truy cập",
        error: true,
      });
    }
  };
}

module.exports = authorizeRole;
