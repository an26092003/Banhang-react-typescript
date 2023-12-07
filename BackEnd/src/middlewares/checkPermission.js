import jwt from "jsonwebtoken";
import Auth from "../models/auth.js";

export const checkPermission = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Bạn chưa đăng nhập",
    });
  }
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, "123456", async (error, decoded) => {
    if (error === "JsonWebTokenError") {
      return res.json({
        message: "Token không hợp lệ",
      });
    }
    const user = await Auth.findById(decoded.id);
    if (user.role !== "admin") {
      return res.status(400).json({
        message: "Bạn không có quyền truy cập tài nguyên này",
      });
    }

    req.user = user;
    next();
  });
};
