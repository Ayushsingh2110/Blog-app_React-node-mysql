import { Router } from "express";
import authRouter from "./authRoute.js";
import postRouter from "./blogRoute.js";
import userRouter from "./userRoute.js";

const route = Router();

route.use("/auth", authRouter)
route.use("/blog", postRouter)
route.use("/user", userRouter)

export default route;