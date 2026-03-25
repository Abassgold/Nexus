import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findUser } from "../type";

export interface CounterState {
    user: findUser;
}

// export interface findUser {
//     email: string;
//     userName: string;
//     _id: string;
//     role?: string;
//   };
const initialState: findUser = {
    email: "",
    userName: "",
    _id: "",
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
            return { email: "", userName: "", _id: "", role: "" }
        }
    }
})

export const { addUser, clearUser } = authUser.actions;
export default authUser.reducer;