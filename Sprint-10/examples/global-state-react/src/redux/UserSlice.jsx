import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    editingUser: null
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        createUser: (state, action) => {
            state.users.push(action.payload);
        },

        deleteUser: (state, action) => {
            state.users = state.users.filter( user => user.id !== action.payload);
        },

        editUser: (state, action) => {
            state.editingUser = action.payload
        },

        updateUser: (state, action) => {
            const {id, userName, userLastName} = action.payload;
            const index = state.users.findIndex( user => user.id === id);
            if(index !== -1) {
                state.users[index] = {id, userName, userLastName};
            }
            state.editingUser = null;
        }
    }
});

export const { createUser, deleteUser, editUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
