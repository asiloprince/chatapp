import {
  MessageCircleMore,
  MessagesSquare,
  Settings,
  Users2,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-20  text-gray-500 h-screen flex flex-col items-center justify-between py-5">
      <span>
        <MessagesSquare />
      </span>
      <div className="flex flex-col">
        <div className="py-4 hover:text-gray-700 flex flex-col items-center justify-center text-blue-600">
          <MessageCircleMore />
          <div className="w-2 h-2 bg-blue-800 rounded-full"></div>
        </div>
        <div className="py-4 hover:text-gray-700">
          <span>
            <Users2 />
          </span>
        </div>
      </div>
      <div>
        <Settings />
      </div>
    </div>
  );
};

export default Sidebar;
