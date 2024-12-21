import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import UsersList from "./components/UsersList";
import Topbar from "@/components/Topbar";

const ChatPage = () => {
  const { messages, selectedUser, fetchUsers, fetchMessages } = useChatStore();
  const { user } = useUser();

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.clerkId);
  }, [selectedUser, fetchMessages]);

  return (
    <main className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
      <Topbar />
      <div className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
        <UsersList />
      </div>
    </main>
  );
};

export default ChatPage;
