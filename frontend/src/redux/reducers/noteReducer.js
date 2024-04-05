import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "../../services/notes";

const initialState = {
  notes: [],
  status: "idle",
  error: null,
};

export const getAllNotes = createAsyncThunk("notes/getAllNotes", async () => {
  const response = await noteService.getAll();
  return response;
});

export const createNote = createAsyncThunk(
  "notes/createNote",
  async (newNote) => {
    const response = await noteService.create(newNote);
    return response;
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ id, updatedNote }) => {
    const response = await noteService.update(id, updatedNote);
    return response;
  }
);

export const deleteNote = createAsyncThunk("notes/deleteNote", async (id) => {
  const response = await noteService.deleteNote(id);
  return response;
});

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;
      })
      .addCase(getAllNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setNotes } = noteSlice.actions;

export default noteSlice.reducer;
