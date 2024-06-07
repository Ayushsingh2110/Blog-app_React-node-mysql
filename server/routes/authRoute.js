import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

const route = Router()

route.post("/login", AuthController.login)
route.post("/register", AuthController.register)

export default route