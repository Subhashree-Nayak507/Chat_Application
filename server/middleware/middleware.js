import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).send("Not authenticated");
    };
    console.log(token);
    jwt.verify(token, process.env.JWT, async (err, payload) => {
      if (err) {
        return res.status(403).send("Token is not valid");
      }
      req.userId = payload.userId;
      next(); 
    });
  } catch (e) {
    console.error("Error in authMiddleware:", e);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
