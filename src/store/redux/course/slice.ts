// Define a type for the slice state
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CourseI {
    name: string
}

// Define the initial state using that type
const initialState: CourseI = {
    name: '',

}

export const slice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        changeName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
    },
})

export const {changeName} = slice.actions
export const courseReduce = slice.reducer

