import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "../../services/blogs";

const initialState = {
  blogs: [],
  status: "idle",
  error: null,
};

export const getAllBlogs = createAsyncThunk("blogs/getAllBlogs", async () => {
  const response = await blogService.getAll();
  return response;
});

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (newBlog) => {
    const response = await blogService.create(newBlog);
    return response;
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, updatedBlog }) => {
    const response = await blogService.update(id, updatedBlog);
    return response;
  }
);

export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (id) => {
  const response = await blogService.deleteBlog(id);
  return response;
});

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setBlogs } = blogSlice.actions;

export default blogSlice.reducer;
