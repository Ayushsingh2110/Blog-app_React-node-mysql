import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login_user: (state, action) => {
            state.user = action.payload
        },
        logout_user: (state) => {
            state.user = {}
        },
    },
})

// Action creators are generated for each case reducer function
export const { login_user, logout_user } = authSlice.actions

export default authSlice.reducer