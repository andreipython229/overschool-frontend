// Define a type for the slice state
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type ClassesType = {
    name: string
    type: string
}

interface CourseI {
    name: string
    classes: ClassesType[]
}

// Define the initial state using that type
const initialState: CourseI = {
    name: '',
    classes: [],

}

export const slice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        changeCourseName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        addClasses: (state, action: PayloadAction<ClassesType>) => {
            state.classes.push(action.payload)
        }
    },
})

export const {changeCourseName,addClasses} = slice.actions
export const courseReduce = slice.reducer

