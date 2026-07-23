import Thread from "../models/Thread.js";
import Message from "../models/Message.js"

import {getGeminiResponse}  from "../utils/gemini.js"

const getRecents = async(req, res) => {
	const thread_title = await Thread.find({}).sort({ updatedAt: -1 });
	res.json({ thread_title });
};

const getChatMessages = async (req, res) => {
	try {
		const { threadId } = req.params;

		const messages = await Message.find({
			threadId: threadId
		}).sort({ createdAt: 1 });

		res.status(200).json(messages);
	} catch (err) {
		console.error("BACKEND\n" + err);
		res.status(500).json({
			error: "Something went wrong"
		});
	}
};

const sendMessage = async (req, res) => {
    const { msg, threadId } = req.body;

    try {
        if (!threadId) {
            const threadTitle = msg.split(" ").slice(0, 5).join(" ");
            const thread = await Thread.create({
                title: threadTitle
            });
            const reply = await getGeminiResponse(msg);

            await Message.create({
                threadId: thread._id,
                role: "user",
                content: msg
            });

            await Message.create({
                threadId: thread._id,
                role: "assistant",
                content: reply
            });

            return res.status(200).json({
                threadId: thread._id,
                role: "assistant",
                message: reply
            });
        }

        // Continue existing chat
        // We'll implement this next.
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Something went wrong"
        });
    }
};
export { getChatMessages, sendMessage ,getRecents};