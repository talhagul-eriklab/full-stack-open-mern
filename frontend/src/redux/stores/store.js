import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../reducers/userReducer";
import noteReducer from "../reducers/noteReducer";
import blogReducer from "../reducers/blogReducer";

const store = configureStore({
    reducer:{
        users: userReducer,
        notes: noteReducer,
        blogs: blogReducer
    }
})

export default store;