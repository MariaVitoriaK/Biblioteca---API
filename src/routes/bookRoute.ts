import { Router } from "express";
import { BookController } from "src/controllers/BookController";
import { authMiddleware } from "../middlewares/auth";


const router = Router();

router.get("/", BookController.getAll);
router.get("/:id", BookController.getById);
router.post("/", authMiddleware, BookController.create);
router.put("/:id", authMiddleware, BookController.update);
router.delete("/:id", authMiddleware, BookController.delete);

export default router;
