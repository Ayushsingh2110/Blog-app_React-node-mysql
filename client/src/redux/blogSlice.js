import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedBlog: {},
}

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        addSelectedBlog: (state, action) => {
            state.selectedBlog = action.payload;
        },
    }
})

export const { addSelectedBlog } = blogSlice.actions

export default blogSlice.reducer