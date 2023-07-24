import jwt from "jsonwebtoken";
import User from "../models/User.js";

//내가만듬 -----------
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "you're not authorized omg" });
  }

  //만약 토큰이 존재한다면?
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "token is invalid" });
    }

    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id == req.params.id || req.user.role == "admin") {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "user, your not authenticated" });
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id == req.params.id || req.user.role == "admin") {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "admin, your not authorized" });
    }
  });
};

//내가만듬끝-----------

// const authenticate = role => async (req, res, next) => {
//  -------------- header에서 토큰 받아오기

//   const authToken = req.headers.authorization;

//   //   check if token exist
//   if (!authToken || !authToken.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }

//   try {
//  ----------------- 토큰 증명사기(verify token)

//     const token = authToken.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     // Check if user has the specified role
//     const user = await User.findById(decoded.id);

//     if (user.role !== role) {
//       return res
//         .status(401)
//         .json({ success: false, message: "You're not authorized" });
//     }

//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     res.status(500).send("Server Error");
//   }
// };

// // Middleware to authenticate admin access
// export const adminAuth = authenticate("admin");

// // Middleware to authenticate patient access
// export const userAuth = authenticate("user");
