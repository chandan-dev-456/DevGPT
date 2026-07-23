import express from "express";
import { getChatMessages, sendMessage ,getRecents} from "../controllers/chatController.js";

const router = express.Router();

router.get("/",getRecents);
router.get("/c/:threadId", getChatMessages);
router.post("/c", sendMessage);

export default router;