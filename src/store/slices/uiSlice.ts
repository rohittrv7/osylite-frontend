import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface UIState {
  darkMode: boolean;
  sidebarOpen: boolean;
  modalOpen: {
    addExpense: boolean;
    settleUp: boolean;
    addFriend: boolean;
    editProfile: boolean;
  };
}

const initialState: UIState = {
  darkMode: localStorage.getItem("darkMode") === "true",
  sidebarOpen: false,
  modalOpen: {
    addExpense: false,
    settleUp: false,
    addFriend: false,
    editProfile: false,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode.toString());
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openModal(state, action: PayloadAction<keyof UIState["modalOpen"]>) {
      state.modalOpen[action.payload] = true;
    },
    closeModal(state, action: PayloadAction<keyof UIState["modalOpen"]>) {
      state.modalOpen[action.payload] = false;
    },
  },
});

export const { toggleDarkMode, toggleSidebar, openModal, closeModal } = uiSlice.actions;

export default uiSlice.reducer;
