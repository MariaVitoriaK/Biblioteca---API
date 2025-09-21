import { Router } from "express";
import { ReservationController } from "src/controllers/ReservationController";


const router = Router();

router.get("/", ReservationController.getAll);
router.post("/", ReservationController.create);
router.delete("/:id", ReservationController.delete);

export default router;
