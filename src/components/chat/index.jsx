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
import React, { useContext, useEffect, useRef, useState } from "react";
import Contacts from "./Contacts";
import Conversation from "./Conversation";
import axios from "axios";
import { getCallSpecificWithoutHeaders } from "../../helpers/apiCallHelpers";
import { io } from "socket.io-client";

const Message = () => {
  const match768 = useMediaQuery("(max-width: 768px)");
  const user = JSON.parse(localStorage.getItem("customerDetails"));
  //gojo: 6523d95670fb3087655dc5e9
  //hashaam: 64d0b902c107a697e2579a68
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [searchUser, setSearchUser] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const apiResponse = await getCallSpecificWithoutHeaders(
          "conversations",
          user?._id
        );
        console.log("apiResponse: ", apiResponse);
        if (apiResponse.status === 200) {
          setConversations(apiResponse?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user?._id]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  const users = [
    { id: 1, name: "User 1", userImage: "https://i.pravatar.cc/300?img=1" },
    { id: 2, name: "User 2", userImage: "https://i.pravatar.cc/300?img=2" },
    { id: 3, name: "User 3", userImage: "https://i.pravatar.cc/300?img=3" },
    { id: 4, name: "User 4", userImage: "https://i.pravatar.cc/300?img=4" },
    { id: 5, name: "User 5", userImage: "https://i.pravatar.cc/300?img=5" },
    { id: 6, name: "User 6", userImage: "https://i.pravatar.cc/300?img=6" },
  ];

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
    setNewMessage("");
  };

  return (
    <Box p={"sm"}>
      <Grid gutter={0}>
        <Grid.Col span={match768 ? 4 : 3}>
          <Contacts
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            searchUser={searchUser}
            setSearchUser={setSearchUser}
            conversations={conversations}
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
