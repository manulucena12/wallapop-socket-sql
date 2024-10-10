import { Router } from "express";
import { getAllUsers, getUserById } from "../handlers/users";

const usersRouter = Router();

usersRouter.get("/", getAllUsers);

usersRouter.get("/:id", getUserById);

export default usersRouter;
