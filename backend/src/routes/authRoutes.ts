import { Router } from "express";
import { signupUser, signinUser, verifyUserAccount, } from "../services/authServices.js";
import { validateSignin, validateSignup } from "../models/ValidationMiddleware/AuthDataValidator.js";

const router = Router()

router.post("/signup", validateSignup, signupUser)
router.post("/signin", validateSignin, signinUser)
router.get("/verify/:code", verifyUserAccount)

export default router;