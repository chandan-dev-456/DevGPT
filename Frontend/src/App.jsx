import { Routes, Route } from "react-router-dom";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import Landing from "../components/Landing";

function App() {
  return (
    <Routes>
      <Route element={<Landing />}>
        <Route path="/" element={<Chat />} />
        <Route path="/devgpt/c/:threadId" element={<Chat />} />
      </Route>
    </Routes>
  );
}

export default App;