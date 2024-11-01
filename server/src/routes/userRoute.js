import userController from "../controllers/userController.js";
import catchAsyncErr from "../services/catchAsync.js";

import { Router } from "express";

const router = Router()

router.route("/register").post(catchAsyncErr(userController.register))
router.route("/login").post(catchAsyncErr(userController.login))

export default router