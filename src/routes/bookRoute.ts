import { Router } from "express";
import { BookController } from "src/controllers/BookController";


const router = Router();

router.get("/", BookController.getAll);
router.get("/:id", BookController.getById);
router.post("/", BookController.create);
router.put("/:id", BookController.update);
router.delete("/:id", BookController.delete);

export default router;
