import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      error: {
        message: "Unauthorized",
        status: 401,
      },
    });
  try {
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    req.params.id = decoded.id;
    next();
  } catch (err) {
    res.status(500).json({
      error: {
        message: "Server error",
        status: 500,
      },
    });
  }
};
