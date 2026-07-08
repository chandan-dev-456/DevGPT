import mongoose from "mongoose";

const ThreadSchema = new mongoose.Schema(
{
    threadId: {
        type: String,
        unique: true,
        required: true
    },

    title: {
        type: String,
        default: "New Chat"
    }
},
{
    timestamps: true
});

export default mongoose.model("Thread", ThreadSchema);