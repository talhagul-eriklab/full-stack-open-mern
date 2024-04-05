import { useState } from "react";

const Blog = ({ blog, handleDeleteConfirmation }) => {
  const [isVisible, setIsVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <>
      <div style={blogStyle}>
        <div>
          {blog.title}
          <button onClick={() => setIsVisible(!isVisible)}>
            {isVisible === false ? "View" : "Expand"}
          </button>
          {isVisible && (
            <>
              <div>Author: {blog.author}</div>
              <div>Url: {blog.url}</div>
              <div>Likes: {blog.likes}</div>
              <button onClick={() => handleDeleteConfirmation(blog.id)}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
