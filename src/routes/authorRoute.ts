import { Router } from "express";
import { AuthorController } from "src/controllers/AuthorController";


const router = Router();

router.get("/", AuthorController.getAll);
router.get("/:id", AuthorController.getById);
router.post("/", AuthorController.create);
router.put("/:id", AuthorController.update);
router.delete("/:id", AuthorController.delete);

export default router;
