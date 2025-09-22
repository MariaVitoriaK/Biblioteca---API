import { Router } from "express";
import { ReservationController } from "src/controllers/ReservationController";
import { authMiddleware } from "../middlewares/auth";


const router = Router();

router.get("/", ReservationController.getAll);
router.post("/", authMiddleware, ReservationController.create);
router.delete("/:id", authMiddleware, ReservationController.delete);

export default router;
