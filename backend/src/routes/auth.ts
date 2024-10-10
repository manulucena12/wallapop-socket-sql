import { Router } from "express";
import { signin, signout, signup, signupdate } from "../handlers/auth";

const authRouter = Router();

authRouter.post("/signup", signup);

authRouter.post("/signin", signin);

authRouter.post("/signout", signout);

authRouter.put("/signupdate", signupdate);

export default authRouter;
