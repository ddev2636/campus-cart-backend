import express from "express";
const router = express.Router();
import { stripeController } from "../controllers/stripeControllers.js";

router.post("/create-checkout-session", stripeController);

export default router;
