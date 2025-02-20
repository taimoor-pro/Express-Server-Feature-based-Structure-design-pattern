import { Router } from "express";
import authRouter from "../api/auth/auth.route";
import { userRouter } from "../api/user/user.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);

export default router;
