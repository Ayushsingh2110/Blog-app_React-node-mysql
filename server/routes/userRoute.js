import { Router } from "express";
import UserController from "../controllers/UserController.js";

const route = Router();

route.get("/:userId", UserController.getUser)

export default route;