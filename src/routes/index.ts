// src/app.ts
import express, { Router } from "express";
import cors from "cors";
import userRoutes from "./userRoute";
import authorRoutes from "./authorRoute";
import genreRoutes from "./genreRoute";
import bookRoutes from "./bookRoute";
import reservationRoutes from "./reservationRoute";

const router = Router()


router.use("/users", userRoutes);
router.use("/authors", authorRoutes);
router.use("/genres", genreRoutes);
router.use("/books", bookRoutes);
router.use("/reservations", reservationRoutes);

export default router;
