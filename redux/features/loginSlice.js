import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name:'login',
    initialState: {
        modalOpen: false,
        activeUser: false,
        userId:null
    },
    reducers: {
        toggelModal: (state) => {
            state.modalOpen = !state.modalOpen;
        },
        toggelActiveUser: (state) => {
            state.activeUser = !state.activeUser;
        },
        setUserId: (state,action) =>{
            state.userId = action.payload;
        },
        reSetUserId: (state) => {
            state.userId = null;
        },
    },
});

export const { toggelModal, toggelActiveUser, setUserId, reSetUserId } = loginSlice.actions;

export default loginSlice.reducer;


