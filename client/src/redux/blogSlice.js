import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selected_blog: {},
}

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        add_selected_blog: (state, action) => {
            state.selected_blog = action.payload;
        },
    }

})

export const { add_selected_blog } = blogSlice.actions

export default blogSlice.reducer