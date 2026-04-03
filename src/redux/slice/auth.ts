import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findUser } from "../type";

export interface CounterState {
    user: findUser;
}

const initialState: findUser = {
    email: "",
    userName: "",
    role: ''
};

export const authUser = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUser: (_, action: PayloadAction<findUser>): findUser => {
            return action.payload;
        },
        clearUser: (): findUser => {
            return { email: "", userName: "", role: "" }
        },
    }
})

export const { addUser, clearUser } = authUser.actions;
export default authUser.reducer;