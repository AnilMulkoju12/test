import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  const jwtSecret = process.env.JWT_SECRET;
  
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in .env");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Add user info to request
    next(); // Proceed to route handler
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
