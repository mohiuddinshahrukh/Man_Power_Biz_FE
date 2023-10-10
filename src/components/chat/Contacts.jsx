/*eslint-disable*/
import { Group, Paper, Text, TextInput } from "@mantine/core";
import React from "react";

const Contacts = ({
  selectedUser,
  setSelectedUser,
  searchUser,
  setSearchUser,
  conversations,
}) => {
  return (
    <div>
      <Paper p={"xs"} bg={"#eee"}>
        <TextInput
          placeholder="Search users..."
          fullWidth
          style={{ marginBottom: "16px" }}
          value={searchUser}
          onChange={(event) => setSearchUser(event.currentTarget.value)}
          radius={"md"}
        />
        {conversations.map((user) => (
          <div
            style={{
              marginBottom: "8px",
              backgroundColor:
                selectedUser.id === user._id ? "#e7e7e7" : "#eee",
              padding: "16px",
              border: selectedUser.id === user._id ? "1px solid #3675e3" : "",
              borderRadius: "8px",
              cursor: "pointer",
              color: "#000",
              fontWeight: selectedUser.id === user._id ? 500 : 400,
            }}
            onClick={() => setSelectedUser(user)}
          >
            <Text>{user.members[0]}</Text>
          </div>
        ))}
      </Paper>
    </div>
  );
};

export default Contacts;
