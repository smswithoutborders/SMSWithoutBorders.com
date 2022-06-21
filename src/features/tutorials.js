// tutorial management
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sync: {
    enabled: false,
    showQR: false,
    showButton: false,
  },
};

export const tutorialSlice = createSlice({
  name: "tutorial",
  initialState,
  reducers: {
    updateSyncTutorial: (state, action) => {
      return {
        ...state,
        sync: {
          ...state.sync,
          ...action.payload,
        },
      };
    },
  },
});

// Action creators are generated for each reducer function
export const { updateSyncTutorial } = tutorialSlice.actions;

// tutorial selector
export const syncTutorialSelector = (state) => state.tutorials.sync;

export default tutorialSlice.reducer;
