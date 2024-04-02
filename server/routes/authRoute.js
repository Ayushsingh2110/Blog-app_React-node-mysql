import { Router } from "express";
import AuthController from "../controllers/authController";

const route = Router()

route.post("/login", AuthController.login)
route.post("/register", AuthController.register)

export default route