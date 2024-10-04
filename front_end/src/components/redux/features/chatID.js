import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    chatID: '',
};
export const chatID = createSlice({
    name: "chatID",
    initialState,
    reducers: {
        setChatID: (state, action) => {
            console.log("clllllllllllllleeeeee33333333333333333", action.payload.chatID, state.chatID)
            state.chatID = action.payload.chatID;
        },
        getChatID: (state) => state.chatID,
    },
});

export const { setChatID, getChatID } = chatID.actions;

export default chatID.reducer;