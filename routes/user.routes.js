import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";


const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.put("/:id",authorize, (req, res) => res.send({ title: "UPDATE a user by ID" }));

userRouter.delete("/:id",authorize, (req, res) => res.send({ title: "DELETE a user by ID" }));

export default userRouter;