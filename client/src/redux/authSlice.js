import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload
        },
        logoutUser: (state) => {
            state.user = {}
        },
    },
})

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser } = authSlice.actions

export default authSlice.reducer