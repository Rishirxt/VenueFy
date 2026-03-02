import express from 'express';
import movieRouter from "../modules/movie/movie.route";
import theaterRouter from "../modules/theatre/theater.routes";
import showRouter from "../modules/show/show.route";
import userRouter from "../modules/user/user.routes";
import authRouter from "../modules/auth/auth.route";
import orderRouter from "../modules/order/order.routes";

const router = express.Router();

router.use("/movies", movieRouter);
router.use("/theaters", theaterRouter);
router.use("/shows", showRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/orders", orderRouter);

export default router;