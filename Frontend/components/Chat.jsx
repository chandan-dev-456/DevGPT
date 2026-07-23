import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Chat.css";

function Chat() {
    const { threadId } = useParams();
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    //show prev msg
    useEffect(() => {
        if (!threadId) {
            setMessages([]);
            setInput("");
            return;
        }

        async function getPrevMsg() {
            try {
                const res = await fetch(
                    `http://localhost:3000/devgpt/c/${threadId}`
                );

                const prevMsgs = await res.json();
                setMessages(prevMsgs);
            } catch (err) {
                console.error(err);
            }
        }

        getPrevMsg();
    }, [threadId]);

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
            {messages.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center px-6">
                    <div className="max-w-3xl text-center">
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                            DevGPT
                        </h1>

                        <p className="mt-4 text-lg text-gray-400">
                            Your AI-powered coding assistant. Debug code, solve DSA, build projects,
                            and learn new technologies.
                        </p>

                        <div className="mt-10 grid gap-4 sm:grid-cols-2">
                            <button
                                onClick={() => setInput("Explain React hooks")}
                                className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5 text-left transition hover:border-blue-500 hover:bg-zinc-800"
                            >
                                <h3 className="font-semibold">⚛️ Explain React Hooks</h3>
                                <p className="mt-2 text-sm text-gray-400">
                                    Learn useState, useEffect, useMemo and more.
                                </p>
                            </button>

                            <button
                                onClick={() => setInput("Create a MERN authentication system")}
                                className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5 text-left transition hover:border-blue-500 hover:bg-zinc-800"
                            >
                                <h3 className="font-semibold">🚀 Build a MERN App</h3>
                                <p className="mt-2 text-sm text-gray-400">
                                    Authentication, JWT, MongoDB and Express.
                                </p>
                            </button>

                            <button
                                onClick={() => setInput("Help me solve a graph problem")}
                                className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5 text-left transition hover:border-blue-500 hover:bg-zinc-800"
                            >
                                <h3 className="font-semibold">🧩 Practice DSA</h3>
                                <p className="mt-2 text-sm text-gray-400">
                                    Solve LeetCode questions step by step.
                                </p>
                            </button>

                            <button
                                onClick={() => setInput("Review my Java code")}
                                className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5 text-left transition hover:border-blue-500 hover:bg-zinc-800"
                            >
                                <h3 className="font-semibold">💻 Review Code</h3>
                                <p className="mt-2 text-sm text-gray-400">
                                    Improve readability, performance and best practices.
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.role}`}>
                            <div className="message-header">
                                {msg.role === "user" ? "👤 You" : "🤖 DevGPT"}
                            </div>

                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                    ))}
                </div>
            )}

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