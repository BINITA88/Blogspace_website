import express from "express";
const router = express.Router();

import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createChat,
  getChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
  leaveFromGroup,
  updateGroup,
  uploadGroupImage,
  updateGroupImage,
} from "../controllers/chatController.js";

router.post("/create", protectRoute, createChat);
router.get("/fetch", protectRoute, getChats);
router.post("/group", protectRoute, createGroupChat);
router.put("/rename", protectRoute, renameGroup);
router.put("/groupadd", protectRoute, addToGroup);
router.put("/groupremove", protectRoute, removeFromGroup);
router.put("/groupleave", protectRoute, leaveFromGroup);
router.put("/updategroup", protectRoute, updateGroup);
router.post("/uploadgroupimage", uploadGroupImage);
router.put("/updategroupimage", updateGroupImage);

export default router;
