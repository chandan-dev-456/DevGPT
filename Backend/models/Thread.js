import mongoose from "mongoose";

const ThreadSchema = new mongoose.Schema(
{
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // },

    title: {
        type: String,
        default: "New Chat"
    }
},
{
    timestamps: true
});

export default mongoose.model("Thread", ThreadSchema);