import React from "react";
import Togglable from "../components/Togglable";
import BlogForm from "../components/Forms/BlogForm";
import NoteForm from "../components/Forms/NoteForm";
import UserForm from "../components/Forms/UserForm";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/userReducer";

const HomePage = ({
  blogFormRef,
  noteFormRef,
  userFormRef,
  setErrorMessage,
}) => {
  const user = useSelector((state) => state.users.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setUser(null));
  };

  return (
    <div>
      <h1>Home Page</h1>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm setErrorMessage={setErrorMessage} />
      </Togglable>
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm setErrorMessage={setErrorMessage} />
      </Togglable>
      <Togglable buttonLabel="new user" ref={userFormRef}>
        <UserForm setErrorMessage={setErrorMessage} />
      </Togglable>
    </div>
  );
};

export default HomePage;
