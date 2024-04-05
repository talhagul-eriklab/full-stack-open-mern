import React from "react";
import Blog from "../components/Blog";
import blogService from "../services/blogs";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setBlogs } from "../redux/reducers/blogReducer";

const Blogs = ({ setErrorMessage }) => {
  const { id } = useParams();
  const blogs = useSelector((state) => state.blogs.blogs);

  const dispatch = useDispatch();

  const deleteBlog = (id) => {
    try {
      blogService.deleteBlog(id).then((returnedBlog) => {
        console.log(`${id} id degerine sahip blog silindi`, returnedBlog);

        dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)));
        window.location.reload();
      });
    } catch (exception) {
      setErrorMessage("Failed to create a new blog");
      setTimeout(() => {
        setErrorMessage(exception);
      }, 5000);
    }
  };

  const handleDeleteConfirmation = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (isConfirmed) {
      deleteBlog(id);
    }
  };

  if (id) {
    const blog = blogs.find((b) => b.id == id);
    if (!blog) return <div>Blog not found</div>; // Eğer kullanıcı bulunamazsa hata gösterin
    return (
      <>
        <h1>Blogs</h1>
        <ul>
          <Blog
            key={blog.id}
            blog={blog}
            handleDeleteConfirmation={handleDeleteConfirmation}
          />
        </ul>
      </>
    );
  } else {
    return (
      <>
        <h1>Blogs</h1>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Blog
                key={blog.id}
                blog={blog}
                handleDeleteConfirmation={handleDeleteConfirmation}
              />
            </li>
          ))}
        </ul>
      </>
    );
  }
};

export default Blogs;
