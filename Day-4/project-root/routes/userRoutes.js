import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getMe, getUsers, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.get("/users", protect, admin, getUsers);
router.delete("/users/:id", protect, admin, deleteUser);

export default router;