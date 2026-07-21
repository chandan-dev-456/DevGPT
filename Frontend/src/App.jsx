import { Routes, Route } from "react-router-dom";
import Chat from "../components/Chat";
import Recent from "./Recents";
import Sidebar from "../components/Sidebar";
import UI from "../components/UI";
function App() {
  return (
    <Routes>
      <Route path="/" element={<UI />} />
      {/* <Route path="/devgpt/c/:threadId?" element={<Chat />} /> */}
    </Routes>
  );
}

export default App;