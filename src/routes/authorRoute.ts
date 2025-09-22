import { Router } from "express";
import { AuthorController } from "src/controllers/AuthorController";
import { authMiddleware } from "../middlewares/auth";


const router = Router();

router.get("/", AuthorController.getAll);
router.get("/:id", AuthorController.getById);
router.post("/", authMiddleware, AuthorController.create);
router.put("/:id", authMiddleware, AuthorController.update);
router.delete("/:id", authMiddleware, AuthorController.delete);

export default router;
