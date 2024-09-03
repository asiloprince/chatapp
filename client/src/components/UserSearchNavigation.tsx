import axios from "axios";
import { Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useChatState } from "@/contexts/chats";

function UserSearchNavigation() {
  const [search, setSearch] = useState("");
  const [searchUser, setSearchUser] = useState([]);
  const { setSelectedChat, setChats, chats } = useChatState();

  const handleSearch = async () => {
    if (!search) {
      toast("Please enter something in search");
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_PUBLIC_API_URL}/user?search=${search}`,
        { withCredentials: true }
      );
      setSearchUser(res.data);
    } catch (err) {
      toast("Error occurred! Failed to load the search results");
    }
  };

  const openConversation = async (userId: any) => {
    try {
      console.log(userId);

      const res = await axios.post(
        `${import.meta.env.VITE_PUBLIC_API_URL}/chat`,
        { userId },
        { withCredentials: true }
      );

      const chatData = res.data;
      if (!chats.find((c) => c._id === chatData._id))
        setChats([chatData, ...chats]);
      setSelectedChat(chatData);
      console.log(chatData);
    } catch (err) {
      toast("Error Fetching Chats");
      console.log(err);
    }
  };
  return (
    <>
      <div className="search-chat flex p-3">
        <input
          className="input text-gray-700 dark:text-gray-200 text-sm p-3 focus:outline-none bg-gray-200 dark:bg-gray-700  w-full rounded-l-md"
          type="text"
          placeholder="Search People"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="bg-gray-200 dark:bg-gray-700 flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
          <Search className="w-4 h-4 ml-2" onClick={handleSearch} />
        </div>
      </div>
      <div className="text-lg font-semibol text-gray-600 dark:text-gray-200 p-3">
        Recent
      </div>
      <div className="overflow-y-auto p-auto">
        {searchUser.map((user: any) => (
          <div
            key={user._id}
            className="flex items-center space-x-2 p-3 hover:bg-primary rounded-lg hover:text-white"
            onClick={() => {
              openConversation(user._id);
            }}
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.profile_img} />
              <AvatarFallback>Chat Tau</AvatarFallback>
            </Avatar>
            <div>{user.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserSearchNavigation;
