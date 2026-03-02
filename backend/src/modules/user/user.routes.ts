import { Router } from "express";
import * as UserController from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", UserController.getAllUsersController);
router.get("/me", authMiddleware, UserController.getUserByIdController); // Note: We might want a specific getMe
router.patch("/update-me", authMiddleware, UserController.updateMeController);
router.get("/:id", UserController.getUserByIdController);
router.patch("/:id/activate", UserController.activateUserController);

export default router;