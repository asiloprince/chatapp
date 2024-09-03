import React, { createContext, useContext, useState, ReactNode } from "react";

interface ChatContextProviderProps {
  children: ReactNode;
}

interface ChatContextType {
  selectedChat: any;
  setSelectedChat: React.Dispatch<React.SetStateAction<any>>;
  notification: any[];
  setNotification: React.Dispatch<React.SetStateAction<any[]>>;
  chats: any[];
  setChats: React.Dispatch<React.SetStateAction<any[]>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const ChatProvider: React.FC<ChatContextProviderProps> = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [chats, setChats] = useState<any[]>([]);
  const [notification, setNotification] = useState<any[]>([]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatState = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatState must be used within a ChatProvider");
  }
  return context;
};

export default ChatProvider;
