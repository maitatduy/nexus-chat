import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { signInSchema, signUpSchema } from "../../validations/auth.validation.js";

const router = express.Router();

router.post("/sign-up", validate(signUpSchema), signUp);
router.post("/sign-in", validate(signInSchema), signIn);

export default router;
