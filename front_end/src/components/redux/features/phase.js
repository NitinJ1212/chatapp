import { createSlice } from "@reduxjs/toolkit";

const currentphases = localStorage.getItem("selected_phase")

const initialState = {
    phase: currentphases || 1,
};
export const phase = createSlice({
    name: "phase",
    initialState,
    reducers: {
        setPhase: (state, action) => {
            state.phase = action.payload.phase;
        },
        getPhase: (state) => state.phase,
    },
});

export const { setPhase, getPhase } = phase.actions;
export default phase.reducer;
