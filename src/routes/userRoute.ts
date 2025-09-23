import { Router } from "express";
import { UserController } from "src/controllers/UserController";
import { authMiddleware } from "../middlewares/auth";


const router = Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
//router.post("/", UserController.create); -> Create é feito no Register
router.put("/:id", authMiddleware, UserController.update);
router.delete("/:id", authMiddleware, UserController.delete);

export default router;
