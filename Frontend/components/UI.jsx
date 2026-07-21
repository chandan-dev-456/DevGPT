import Sidebar from "./Sidebar";
import Chat from "./Chat";

export default function UI() {
    return (
        <div className="flex h-screen bg-zinc-950 overflow-hidden">
            <div className="flex-shrink-0">
                <Sidebar />
            </div>
            
            <div className="flex-1 min-w-0 p-6">
                <div className="h-full bg-zinc-900/50 rounded-2xl border border-zinc-800/50 overflow-hidden">
                    <Chat />
                </div>
            </div>
        </div>
    );
}