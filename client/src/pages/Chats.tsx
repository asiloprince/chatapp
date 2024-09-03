import ChatMessage from "@/components/ChatMessage";
import Chatbox from "@/components/Chatbox";
import Sidebar from "@/components/Sidebar";

// interface ChatLayoutProps {
//   title: string;
//   action?: React.ReactNode;
// }
const Chats = () => {
  return (
    <div className="">
      <div className="flex bg-white dark:bg-gray-900">
        {/* sidebar */}
        <Sidebar />
        <div className="w-80 h-screen dark:bg-gray-800 bg-gray-100 p-2 hidden md:block">
          <Chatbox />
        </div>
        <div className="flex-grow  h-screen p-2 rounded-md">
          <ChatMessage />
        </div>
      </div>
    </div>
  );
};

export default Chats;
