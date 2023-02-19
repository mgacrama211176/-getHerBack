import express from "express";
import {
  addNotif,
  fetchAllNotif,
  updateNotif,
} from "../controller/notificationController.js";

const router = express();

// get all the users from the database
router.post("/addNotif", addNotif);
router.get("/getNotif", fetchAllNotif);
router.put("/updateNotif", updateNotif);

export default router;
