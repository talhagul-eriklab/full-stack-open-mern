import { useState, useEffect, useRef } from "react";
import userService from "./services/users";
import blogService from "./services/blogs";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Users from "./pages/Users";
import Notes from "./pages/Notes";
import Blogs from "./pages/Blogs";
import LoginPage from "./pages/LoginPage";
import { Nav, Navbar } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, setUser } from "../src/redux/reducers/userReducer";
import { getAllBlogs } from "../src/redux/reducers/blogReducer";
import { getAllNotes } from "../src/redux/reducers/noteReducer";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const blogFormRef = useRef();
  const noteFormRef = useRef();
  const userFormRef = useRef();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
      noteService.setToken(user.token);
      userService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllNotes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const padding = {
    padding: 5,
  };

  return (
    <Router>
      <Notification message={errorMessage} />
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                home
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                users
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/blogs">
                blogs
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/notes">
                notes
              </Link>
            </Nav.Link>

            <Nav.Link href="#" as="span">
              {user ? (
                <em style={padding}>{user.name} logged in</em>
              ) : (
                <Link style={padding} to="/login">
                  login
                </Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <HomePage
                blogFormRef={blogFormRef}
                noteFormRef={noteFormRef}
                userFormRef={userFormRef}
                setErrorMessage={setErrorMessage}
              />
            ) : (
              <LoginPage setErrorMessage={setErrorMessage} />
            )
          }
        />
        <Route
          path="/users"
          element={
            user ? <Users /> : <LoginPage setErrorMessage={setErrorMessage} />
          }
        />
        <Route
          path="/users/:id"
          element={
            user ? <Users /> : <LoginPage setErrorMessage={setErrorMessage} />
          }
        />
        <Route
          path="/blogs"
          element={
            user ? (
              <Blogs setErrorMessage={setErrorMessage} />
            ) : (
              <LoginPage setErrorMessage={setErrorMessage} />
            )
          }
        />
        <Route
          path="/blogs/:id"
          element={
            user ? (
              <Blogs setErrorMessage={setErrorMessage} />
            ) : (
              <LoginPage setErrorMessage={setErrorMessage} />
            )
          }
        />
        <Route
          path="/notes"
          element={
            user ? (
              <Notes setErrorMessage={setErrorMessage} />
            ) : (
              <LoginPage setErrorMessage={setErrorMessage} />
            )
          }
        />
        <Route
          path="/notes/:id"
          element={
            user ? (
              <Notes setErrorMessage={setErrorMessage} />
            ) : (
              <LoginPage setErrorMessage={setErrorMessage} />
            )
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
