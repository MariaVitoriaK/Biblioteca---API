import { Router } from "express";
import { ReservationController } from "src/controllers/ReservationController";
import { authMiddleware } from "src/middlewares/auth";


const router = Router();

router.get("/", ReservationController.getAll);
router.post("/", ReservationController.create);
router.delete("/:id", ReservationController.delete);

export default router;
