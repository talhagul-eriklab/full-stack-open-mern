import React from "react";
import LoginForm from "../components/Forms/LoginForm";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  setUsername,
  setPassword,
} from "../redux/reducers/userReducer";

const LoginPage = ({ setErrorMessage }) => {
  const [loginVisible, setLoginVisible] = useState(false);

  const dispatch = useDispatch();

  const username = useSelector((state) => state.users.username);
  const password = useSelector((state) => state.users.password);

  const hideWhenVisible = { display: loginVisible ? "none" : "" };
  const showWhenVisible = { display: loginVisible ? "" : "none" };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(setUsername(""));
      dispatch(setPassword(""));
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      Login Page
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>log in</button>
      </div>
      <div style={showWhenVisible}>
        <LoginForm handleLogin={handleLogin} />
        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
    </div>
  );
};

export default LoginPage;
