import React from "react";
import { Link, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const Notes = () => {
  const { id } = useParams(); // useParams ile id'yi alın

  const notes = useSelector((state) => state.notes.notes);

  if (id) {
    const note = notes.find((n) => n.id == id);
    if (!note) return <div>Note not found</div>; // Eğer not bulunamazsa hata gösterin
    return (
      <>
        <h1>Notes</h1>
        <Table striped bordered>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{note.name}</td>
            </tr>
            <tr>
              <td>Content</td>
              <td>{note.content}</td>
            </tr>
            <tr>
              <td>User Name</td>
              <td>{note.user?.name}</td>
            </tr>
            <tr>
              <td>User Username</td>
              <td>{note.user?.username}</td>
            </tr>
            <tr>
              <td>Important</td>
              <td>{note.important ? "Important" : ""}</td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  } else {
    return (
      <>
        <h2>Notes</h2>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th>Content</th>
              <th>User Name</th>
              <th>User Username</th>
              <th>Important</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id}>
                <td>{note.name}</td>
                <td>
                  <Link to={`/notes/${note.id}`}>{note.content}</Link>{" "}
                </td>
                <td>{note.user?.name}</td>
                <td>{note.user?.username}</td>
                <td>{note.important ? "Important" : ""}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
};

export default Notes;
