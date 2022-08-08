import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  1: {
    network: "airtel",
    description: "Fastest service",
  },
  2: {
    network: "jio",
    description: "Cheap price",
  },
};

const networkdataSlice = createSlice({
  name: "Network Data",
  initialState,
  reducers: {
    addNetwork(state, action) {
      const { id, network, description } = action.payload;
      state[id] = { network, description };
    },
    deleteNetwork(state, { payload: id }) {
      delete state[id];
    },
  },
});

export const networkdataSliceActions = networkdataSlice.actions;
export const networkdataSliceReducer = networkdataSlice.reducer;
