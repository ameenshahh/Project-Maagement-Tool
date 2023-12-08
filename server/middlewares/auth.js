const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

exports.authenticate = async (req, res, next) => {
  const token = req.header("authorization");
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({ message: "No token found" });
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token verification failed." });
      }

      // Inside the callback, user contains the payload
      req.user = user;

      // You can now access the user object here
      const payload = user;

      if (payload) {
        const user = await UserModel.findOne({ email: payload.email });

        req.user = user;
        next();
      } else {
        return res
          .status(400)
          .json({ status: false, message: "You are not authorized" });
      }
    });
  } catch (err) {
    return res
      .status(400)
      .json({ status: false, message: "Something went wrong" });
  }
};
