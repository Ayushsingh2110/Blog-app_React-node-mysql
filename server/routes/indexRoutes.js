import { Router } from "express";
import authRouter from "./authRoute.js";
import postRouter from "./postRoute.js";
import userRoute from "./userRoute.js";

const route = Router();

route.use("/auth", authRouter)
route.use("/post", postRouter)
route.use("/user", userRouter)

export default route;