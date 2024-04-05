import React from "react";
import { useState } from "react";
import userService from "../../services/users";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../redux/reducers/userReducer";

const UserForm = ({ setErrorMessage }) => {
  const [newUsername, setNewUsername] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const users = useSelector((state) => state.users.users);

  const dispatch = useDispatch();

  const addUser = (event) => {
    event.preventDefault();
    const userObject = {
      username: newUsername,
      name: newName,
      password: newPassword,
    };

    try {
      userService.create(userObject).then((returnedUser) => {
        console.log(returnedUser);
        dispatch(setUsers(users.concat(returnedUser)));
        setNewUsername("");
        setNewName("");
        setNewPassword("");
      });
    } catch (exception) {
      setErrorMessage("Failed to create a new blog");
      setTimeout(() => {
        setErrorMessage(exception);
      }, 5000);
    }
  };

  return (
    <>
      <h1>Create a new User</h1>
      <form onSubmit={addUser}>
        Username{" "}
        <input
          value={newUsername}
          placeholder="Content"
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <br />
        Name{" "}
        <input
          value={newName}
          placeholder="Content"
          onChange={(e) => setNewName(e.target.value)}
        />
        <br />
        Password{" "}
        <input
          value={newPassword}
          placeholder="Content"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <br />
        <button type="submit">save</button>
      </form>
    </>
  );
};

export default UserForm;
