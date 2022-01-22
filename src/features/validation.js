// used for managing Two Factor authentication data
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  svid: "",
  session_id: "",
  auth_key: "",
};

export const validationSlice = createSlice({
  name: "validation",
  initialState,
  reducers: {
    saveValidationCreds: (state, action) => {
      return {
        ...state,
        ...action.payload,
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
