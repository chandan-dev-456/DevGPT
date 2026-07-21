import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams, useNavigate } from "react-router-dom";
import "./Chat.css";

function Chat() {
    const { threadId } = useParams();
    const navigate = useNavigate();

    const [input, setInput] = useState("");

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "Hello! How can I help you today?",
        },
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!input.trim()) return;

        const message = input;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: message,
            },
        ]);

        setInput("");

        try {
            const res = await fetch("http://localhost:3000/devgpt/c", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    threadId,
                    msg: message,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to get response");
            }

            const data = await res.json();

            if (!threadId && data.threadId) {
                navigate(`/devgpt/c/${data.threadId}`, {
                    replace: true,
                });
            }

            setMessages((prev) => [
                ...prev,
                {
                    role: data.role,
                    content: data.message,
                },
            ]);
        } catch (err) {
            console.error(err);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "❌ Something went wrong. Please try again.",
                },
            ]);
        }
    };
    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="input-box">
                <input
                    type="text"
                    placeholder="Ask anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
            <button
                className="new-chat-btn"
                onClick={() => navigate("/")}
            >
                New Chat
            </button>
        </div>
    );
}
export default Chat;