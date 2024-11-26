import { Router } from "express";
import { addProfileImage, getUserInfo, login, removeProfileImage, signup, UpdateProfile } from "../controllers/AuthController.js";
import { authMiddleware } from "../middleware/middleware.js";
import multer from "multer";

const upload = multer({ dest:"uploads/profiles/" });
const authRoutes = Router();

authRoutes.post("/signup",signup);
authRoutes.post("/login",login);
authRoutes.get("/user-info",authMiddleware,getUserInfo);
authRoutes.post("/update-profile",authMiddleware,UpdateProfile);
authRoutes.post("/add-profile-image",authMiddleware,upload.single('profile-image'),addProfileImage);
authRoutes.delete('/remove-profile-image',authMiddleware,removeProfileImage)

export default authRoutes;