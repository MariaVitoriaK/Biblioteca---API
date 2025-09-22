import { Router } from "express";
import { GenreController } from "src/controllers/GenreController";
import { authMiddleware } from "../middlewares/auth";


const router = Router();

router.get("/", GenreController.getAll);
router.get("/:id", GenreController.getById);
router.post("/", authMiddleware, GenreController.create);
router.put("/:id", authMiddleware, GenreController.update);
router.delete("/:id", authMiddleware, GenreController.delete);

export default router;
