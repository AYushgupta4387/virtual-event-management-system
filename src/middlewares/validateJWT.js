import jwt from "jsonwebtoken";

const validateJWT = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .send({ message: "Unauthorized access. Token required." });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    req.user = decodedToken;

    next();
  } catch (err) {
    // If token is invalid or expired, return 401
    res
      .status(401)
      .send({ message: "Unauthorized access. Invalid or expired token." });
  }
};

export default validateJWT;
