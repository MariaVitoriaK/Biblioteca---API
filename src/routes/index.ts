import express, { Router } from "express";
import userRoutes from "./userRoute";
import authorRoutes from "./authorRoute";
import genreRoutes from "./genreRoute";
import bookRoutes from "./bookRoute";
import reservationRoutes from "./reservationRoute";
import authRoutes from "./authRoute";


const router = Router()

router.use("/users", userRoutes);
router.use("/authors", authorRoutes);
router.use("/genres", genreRoutes);
router.use("/books", bookRoutes);
router.use("/reservations", reservationRoutes);
router.use("/auth", authRoutes);

export default router;
