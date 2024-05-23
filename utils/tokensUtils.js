import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "9h" });
}

export const verifyToken = (token) => {
  if (!token) {
    return null; // Return null if token is falsy
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new jwt.TokenExpiredError("Token Expired", error.expiredAt);
    }
    // Handle other errors if necessary
    console.error('Error verifying token:', error);
    return null;
  }
};

