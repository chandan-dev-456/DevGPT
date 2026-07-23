import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {
    const navigate = useNavigate();
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        async function fetchThreads() {
            try {
                const res = await fetch("http://localhost:3000/");
                const data = await res.json();
                setThreads(data.thread_title);
            } catch (err) {
                console.error(err);
            }
        }
        fetchThreads();
    }, []);
    
    return (
        <aside className="w-80 h-screen bg-zinc-900/50 rounded-2xl border border-zinc-800/50 p-6 flex flex-col">
            <div className="pb-4">
                <h1 className="text-2xl font-semibold text-white">
                    Recent
                </h1>
            </div>

            <div className="flex-1 overflow-y-auto">
                <ul className="space-y-2 pt-2 pb-4">
                    {threads.map((thread) => (
                        <li
                            key={thread._id}
                            onClick={()=>{navigate(`devgpt/c/${thread._id}`);}}
                            className="px-5 py-3.5 text-lg text-zinc-200 hover:bg-zinc-800/80 rounded-xl cursor-pointer transition-all duration-200"
                        >
                            {thread.title}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}