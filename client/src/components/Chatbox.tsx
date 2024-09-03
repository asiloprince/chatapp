import { useEffect, useState } from "react";
import UserSearchNavigation from "./UserSearchNavigation";
import axios from "axios";

const Chatbox = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_PUBLIC_API_URL}/auth`,
          { withCredentials: true }
        );

        const userDetails = res.data;
        setUserName(userDetails.user.name);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserName();
  }, []);
  return (
    <div className="h-full overflow-y-auto">
      <div className="text-xl font-extrabold text-gray-600 dark:text-gray-200 p-3">
        {userName}
      </div>
      <UserSearchNavigation />
    </div>
  );
};

export default Chatbox;
