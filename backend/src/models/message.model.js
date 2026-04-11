import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
            index: true,
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        content: {
            type: String,
            trim: true,
        },
        imageUrl: String,
    },
    {
        timestamps: true,
    },
);

messageSchema.index({
    conversationId: 1,
    createdAt: -1,
});

const Message = mongoose.model("Message", messageSchema, "messages");

export default Message;
