import express from "express";
import { createReview } from "./../controllers/reviewController.js";
// import { userAuth } from "../utils/verifyToken.js";
const router = express.Router();
// router.post("/:tourId", userAuth, createReview);

//---------내가만듬
import { verifyUser } from "../utils/verifyToken.js";
router.post("/:tourId", verifyUser, createReview);
//---------내가만듬끝

export default router;
