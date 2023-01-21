import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = new Router();
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post(
  "/registration",
  body("firstName").notEmpty(),
  body("lastName").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 20 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);

export default router;
