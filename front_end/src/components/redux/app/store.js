import { configureStore } from "@reduxjs/toolkit";
import chatID from "../features/chatID";
import phase from "../features/phase";





export default configureStore({
    reducer: {
        chatID: chatID,
        phase: phase,
    }
});
