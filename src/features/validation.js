// used for managing Two Factor authentication data
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  svid: "",
  session_id: "",
};

export const validationSlice = createSlice({
  name: "validation",
  initialState,
  reducers: {
    saveValidationCreds: (state, action) => {
      const { svid, session_id } = action.payload;
      return {
        ...state,
        svid,
        session_id,
      };
    },
    clearValidationCreds: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

// Action creators are generated for each reducer function
export const { saveValidationCreds, clearValidationCreds } =
  validationSlice.actions;

// auth selector
export const validationSelector = (state) => state.validation;

export default validationSlice.reducer;
