import React from "react";
import { useState } from "react";
import blogService from "../../services/blogs";
import { useSelector, useDispatch } from "react-redux";

const BlogForm = ({ setErrorMessage }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newLikes, setNewLikes] = useState(0);

  const blogs = useSelector((state) => state.blogs.blogs); // Redux store'daki blogs alanı

  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
    };

    try {
      blogService.create(blogObject).then((returnedBlog) => {
        console.log(returnedBlog);
        dispatch(setBlogs(blogs.concat(returnedBlog)));
        setNewTitle("");
        setNewAuthor("");
        setNewUrl("");
        setNewLikes(0);
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
      <h1>Create a new Blog</h1>
      <form onSubmit={addBlog}>
        Title{" "}
        <input
          value={newTitle}
          placeholder="Title"
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <br />
        Author{" "}
        <input
          value={newAuthor}
          placeholder="Author"
          onChange={(e) => setNewAuthor(e.target.value)}
        />
        <br />
        Url{" "}
        <input
          value={newUrl}
          placeholder="Url"
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <br />
        Likes{" "}
        <input
          value={newLikes}
          placeholder="Likes"
          onChange={(e) => setNewLikes(e.target.value)}
        />
        <br />
        <button type="submit">save</button>
      </form>
    </>
  );
};

export default BlogForm;
