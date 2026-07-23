import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
export default function Landing() {
    return (
        <div className="flex h-screen bg-zinc-950 overflow-hidden">
            <Sidebar />

            <div className="flex-1 min-w-0 p-6">
                <div className="h-full bg-zinc-900/50 rounded-2xl border border-zinc-800/50 overflow-hidden">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}