import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../services/users";

const initialState = {
  users: [],
  user: [],
  username: "",
  password: "",
  status: "idle",
  error: null,
};

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  const response = await userService.getAll();
  return response;
});

export const createUser = createAsyncThunk(
  "users/createUser",
  async (newUser) => {
    const response = await userService.create(newUser);
    return response;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, updatedUser }) => {
    const response = await userService.update(id, updatedUser);
    return response;
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  const response = await userService.deleteUser(id);
  return response;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setUser, setUsers, setUsername, setPassword } =
  userSlice.actions;

export default userSlice.reducer;
