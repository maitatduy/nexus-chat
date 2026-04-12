import express from "express";
import { createConversation, getConversations, getMessages } from "../controllers/conversation.controller.js";
import { checkFriendship, checkGroupMembership } from "../middlewares/friend.middleware.js";

const router = express.Router();

router.post("/", checkFriendship, createConversation);
router.get("/", checkGroupMembership, getConversations);
router.get("/:conversationId/messages", getMessages);

export default router;
