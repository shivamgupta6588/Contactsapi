import express from "express";
import {
  createUser,
  loginUser,
  currentUser,
} from "../controllers/userController.js";
import { validateUser } from "../middleware/validateUser.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/current", validateUser, currentUser);

export default router;
