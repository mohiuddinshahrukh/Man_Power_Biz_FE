/*eslint-disable*/
import { Group, Paper, TextInput } from "@mantine/core";
import React from "react";

const Contacts = ({
  users,
  selectedUser,
  setSelectedUser,
  searchUser,
  setSearchUser,
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
        {users.map((user) => (
          <div
            style={{
              marginBottom: "8px",
              backgroundColor: selectedUser.id === user.id ? "#e7e7e7" : "#eee",
              padding: "16px",
              border: selectedUser.id === user.id ? "1px solid #3675e3" : "",
              borderRadius: "8px",
              cursor: "pointer",
              color: "#000",
              fontWeight: selectedUser.id === user.id ? 500 : 400,
            }}
            onClick={() => setSelectedUser(user)}
          >
            <Group noWrap spacing={3}>
              <img
                src={user.userImage}
                alt={user.name}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "8px",
                }}
              />
              {user.name}
            </Group>
          </div>
        ))}
      </Paper>
    </div>
  );
};

export default Contacts;
