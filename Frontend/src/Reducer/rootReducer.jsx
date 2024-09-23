import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import projectSlice from "./projectSlice";


const rootReducer = combineReducers({
    auth : authSlice,
    project : projectSlice
});

export default rootReducer;