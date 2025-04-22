import authorize from "../middlewares/auth.middleware.js";
import { Router } from "express";
import {
  createSubscription,
  getAllSubscription,
  getUserSubscription,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", getAllSubscription);

subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ title: "GET upcoming renewals" })
);

subscriptionRouter.get("/user/:id", authorize, getUserSubscription);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "UPDATE susbscription details by ID" })
);

subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ title: "DELETE susbscription by ID" })
);

subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ title: "GET all user susbscriptions" })
);

export default subscriptionRouter;
