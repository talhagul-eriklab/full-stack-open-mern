import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Users = () => {
  const { id } = useParams(); // useParams ile id'yi alın

  const users = useSelector((state) => state.users.users);

  if (id) {
    const user = users.find((u) => u.id == id);
    if (!user) return <div>User not found</div>; // Eğer kullanıcı bulunamazsa hata gösterin
    return (
      <>
        <h1>Users</h1>
        <h2>User Id: {user.id}</h2>
        <div>Name: {user.name}</div>
        <div>Username: {user.username}</div>
        <ul>
          <h3>User Notes</h3>
          {user.notes.map((note) => (
            <li key={note.id}>
              <div>Note Id: {note.id}</div>
              <div>Important: {note.important}</div>
              <div>Content: {note.content}</div>
              <br />
            </li>
          ))}
        </ul>
        <ul>
          <h3>User Blogs</h3>
          {user.blogs?.map((blog) => (
            <li key={blog.id}>
              <div>Blog Id: {blog.id}</div>
              <div>Author: {blog.author}</div>
              <div>Title: {blog.title}</div>
              <div>Url: {blog.url}</div>
              <div>Likes: {blog.likes}</div>
              <br />
            </li>
          ))}
        </ul>
        <br />{" "}
      </>
    );
  } else {
    return (
      <>
        <h1>Users</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <h2>User {user.name}</h2>
              <div>User Id: {user.id}</div>
              <div>Name: {user.name}</div>
              <div>Username: {user.username}</div>
              <ul>
                <h3>User Notes</h3>
                {user.notes.map((note) => (
                  <li key={note.id}>
                    <div>Note Id: {note.id}</div>
                    <div>Important: {note.important}</div>
                    <div>Content: {note.content}</div>
                    <br />
                  </li>
                ))}
              </ul>
              <ul>
                <h3>User Blogs</h3>
                {user.blogs?.map((blog) => (
                  <li key={blog.id}>
                    <div>Blog Id: {blog.id}</div>
                    <div>Author: {blog.author}</div>
                    <div>Title: {blog.title}</div>
                    <div>Url: {blog.url}</div>
                    <div>Likes: {blog.likes}</div>
                    <br />
                  </li>
                ))}
              </ul>
              <br />
            </li>
          ))}
        </ul>
      </>
    );
  }
};

export default Users;
