import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  1: {
    id: "1",
    username: "vinoth",
    password: "12345",
    role: "Admin",
    status: "Logged out",
    data: 77,
  },
  2: {
    id: "2",
    username: "abdur",
    password: "54321",
    role: "Client",
    status: "Logged out",
    data: {
      location: "Tirunelveli",
    },
  },
};

const userdataSlice = createSlice({
  name: "User Data",
  initialState,
  reducers: {
    setUserStatus(state, action) {
      const { id, status } = action.payload;
      //checks if user exists first, then changes the state
      if (state[id] === undefined) return state;
      else state[id].status = status;
    },
    deleteUser(state, { payload: id }) {
      delete state[id];
    },
    addUser(state, action) {
      const { id, username, password, role, status, data } = action.payload;
      state[id] = {
        id,
        username,
        password,
        role,
        status,
        data: JSON.parse(data),
      };
    },
  },
});

export const userdataSliceActions = userdataSlice.actions;
export const userdataSliceReducer = userdataSlice.reducer;
