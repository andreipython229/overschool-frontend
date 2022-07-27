// Define a type for the slice state
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {UserT} from "types/userT";

type AuthDateT = {
    authDate: string | number
}
const initialState: UserT & AuthDateT = {
    auth: false,
    avatar: null,
    user: {first_name: 'Без имени', email: 'example@gmail.com', last_name: 'None'},
    phone_number: '+375(**)***-**-**',
    city: 'Minsk',
    permission: 1,
    sex: '-',
    authDate: '',
    aboutMySelf: ''
}

export const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        auth: (state, action: PayloadAction<boolean>) => {
            state.auth = action.payload
        },
        loginUser: (state, action: PayloadAction<{ value: string | number }>) => {
            state.authDate = action.payload.value
        },
        changeInfo: (state, action: PayloadAction<any>) => {
            state.city = action.payload.city
            state.avatar = action.payload.avatar
            state.user.first_name = action.payload.name
            state.user.email = action.payload.email
            state.phone_number = action.payload.phone
            state.sex = action.payload.sex
            state.aboutMySelf = action.payload.aboutMySelf
        }

    },
})

export const {auth, loginUser, changeInfo} = slice.actions
export const authReduce = slice.reducer

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user
