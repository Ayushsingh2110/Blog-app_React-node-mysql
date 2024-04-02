import { Router } from "express";
import UserController from "../controllers/userController";

const route = Router();

route.get("/:userId", UserController.getUser)

export default route;