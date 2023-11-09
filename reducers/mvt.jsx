import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const mouvementsSlice = createSlice({
  name: "mouvements",

  initialState,
  reducers: {
    addDataToStore: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { addDataToStore } = mouvementsSlice.actions;
export default mouvementsSlice.reducer;
