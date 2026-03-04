import express from "express";
import movieRoutes from "../src/modules/movie/movie.route";
import theaterRoutes from "../src/modules/theatre/theater.routes";
import showRoutes from "../src/modules/show/show.route";
import locationRoutes from "../src/modules/location/location.route";
import authRoutes from "../src/modules/auth/auth.route";
import orderRoutes from "../src/modules/order/order.routes";
import userRoutes from "../src/modules/user/user.routes";
import eventRoutes from "../src/modules/event/event.route";

const router = express.Router();

router.use('/movies', movieRoutes);
router.use("/theaters", theaterRoutes);
router.use("/shows", showRoutes);
router.use("/location", locationRoutes);
router.use("/auth", authRoutes);
router.use("/orders", orderRoutes);
router.use("/users", userRoutes);
router.use("/user", userRoutes);
router.use("/events", eventRoutes);

export default router;
