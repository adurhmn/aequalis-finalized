//Third Party Imports
import { configureStore } from "@reduxjs/toolkit";

//Local Imports
import { authSliceReducer } from "./authSlice";
import { userdataSliceReducer } from "./userdataSlice";
import { networkdataSliceReducer } from "./networkdataSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    userdata: userdataSliceReducer,
    networkdata: networkdataSliceReducer,
  },
});

export default store;
