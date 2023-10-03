/*eslint-disable*/
import {
  Box,
  Button,
  Container,
  Grid,
  Group,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";
import Contacts from "./Contacts";
import Conversation from "./Conversation";

const Message = () => {
  const match768 = useMediaQuery("(max-width: 768px)");

  const users = [
    { id: 1, name: "User 1", userImage: "https://i.pravatar.cc/300?img=1" },
    { id: 2, name: "User 2", userImage: "https://i.pravatar.cc/300?img=2" },
    { id: 3, name: "User 3", userImage: "https://i.pravatar.cc/300?img=3" },
    { id: 4, name: "User 4", userImage: "https://i.pravatar.cc/300?img=4" },
    { id: 5, name: "User 5", userImage: "https://i.pravatar.cc/300?img=5" },
    { id: 6, name: "User 6", userImage: "https://i.pravatar.cc/300?img=6" },
  ];

  // Initialize messages state with initial messages
  const initialMessages = [
    { id: 1, senderId: 1, text: "Hello, how are you?" },
    { id: 2, senderId: 2, text: "I am good, thanks!" },
  ];

  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [searchUser, setSearchUser] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  // Function to send a new message
  const sendMessage = () => {
    if (newMessage.trim() === "") return; // Don't send empty messages

    const newMessageObj = {
      id: messages.length + 1, // Generate a unique ID for the new message
      senderId: 1, // Assuming you are User 1
      text: newMessage,
    };

    // Update the messages state with the new message
    setMessages([...messages, newMessageObj]);
    setNewMessage(""); // Clear the message input field
  };

  return (
    <Box p={"sm"}>
      <Grid gutter={0}>
        <Grid.Col span={match768 ? 4 : 3}>
          <Contacts
            users={users}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            searchUser={searchUser}
            setSearchUser={setSearchUser}
          />
        </Grid.Col>
        <Grid.Col span={match768 ? 8 : 9}>
          <Conversation
            selectedUser={selectedUser}
            messages={messages}
            setMessages={setMessages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default Message;
