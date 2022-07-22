// Define a type for the slice state
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface UserI {
    auth: boolean
    avatar: null | string
    name: string
    email: string
    phone: string
    city: string
    role: number
    authDate: string | number | null
    password: string
}

// Define the initial state using that type
const initialState: UserI = {
    auth: false,
    avatar: null,
    name: 'Без имени',
    email: 'example@gmail.com',
    phone: '+375(**)***-**-**',
    city: 'Belarus',
    role: 1,
    authDate: null,
    password: ''
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
            state.name = action.payload.name
            state.email = action.payload.email
            state.phone = action.payload.phone
            state.password = action.payload.password
        }

    },
})

export const {auth, loginUser, changeInfo} = slice.actions
export const authReduce = slice.reducer

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user
