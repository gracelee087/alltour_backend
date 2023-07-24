import express from "express";
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "../controllers/userController.js";
const router = express.Router();

// import { adminAuth, userAuth } from "../utils/verifyToken.js";



//---------아래 내가만듬 ------------
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';


router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", verifyUser, getSingleUser);
router.get("/", verifyAdmin, getAllUser);


//---------아래 내가만듬 끝 ------------//






// // update  user
// router.put("/:id", userAuth, updateUser);

// // delete user
// router.delete("/:id", adminAuth, deleteUser);

// // get single user
// router.get("/:id", userAuth, getSingleUser);

// // get all users
// router.get("/", adminAuth, getAllUser);

export default router;
