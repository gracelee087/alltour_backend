import express from "express";
import {
  createBooking,
  getAllBooking,
  getBooking,
} from "../controllers/bookingController.js";
// import { adminAuth, userAuth } from "../utils/verifyToken.js";

const router = express.Router();

//---------내가만듬
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

router.post("/", verifyUser, createBooking);
router.get("/:id", verifyUser, getBooking);
router.get("/", verifyAdmin, getAllBooking);

//---------내가만듬끝

// router.post("/", userAuth, createBooking);
// router.get("/:id", userAuth, getBooking);
// router.get("/", adminAuth, getAllBooking);

export default router;
