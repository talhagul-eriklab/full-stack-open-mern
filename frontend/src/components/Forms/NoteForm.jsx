import React from "react";
import noteService from "../../services/notes";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const BlogForm = ({ setErrorMessage }) => {
  const [newContent, setNewContent] = useState("");
  const [newImportant, setNewImportant] = useState(false);

  const notes = useSelector((state) => state.notes.notes);

  const dispatch = useDispatch();

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newContent,
      important: newImportant || false,
    };

    try {
      noteService.create(noteObject).then((returnedNote) => {
        console.log(returnedNote);
        dispatch(setNotes(notes.concat(returnedNote)));
        setNewContent("");
        setNewImportant(false);
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
      <h1>Create a new Note</h1>
      <form onSubmit={addNote}>
        Content{" "}
        <input
          value={newContent}
          placeholder="Content"
          onChange={(e) => setNewContent(e.target.value)}
        />
        <br />
        <button type="submit">save</button>
      </form>
    </>
  );
};

export default BlogForm;
