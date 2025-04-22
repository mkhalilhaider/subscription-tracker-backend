import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";


const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUser);

<<<<<<< HEAD
userRouter.put("/:id",authorize, (req, res) => res.send({ title: "UPDATE a user by ID" }));

userRouter.delete("/:id",authorize, (req, res) => res.send({ title: "DELETE a user by ID" }));
=======
userRouter.post("/", (req, res) => res.send({ title: "CREATE a new user" }));

userRouter.put("/:id", (req, res) => res.send({ title: "UPDATE a user by ID" }));

userRouter.delete("/:id", (req, res) => res.send({ title: "DELETE a user by ID" }));
>>>>>>> ac0ec141668a12e45d592ffb8d7980edc466c564

export default userRouter;