import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface SchoolIdState {
    schoolId: number | null;
}

const initialState: SchoolIdState = {
    schoolId: null,
};

const schoolIdSlice = createSlice({
    name: 'school_id',
    initialState,
    reducers: {
        setSchoolId: (state, action: PayloadAction<number>): void => {
            state.schoolId = action.payload;
        },
    },
});

export const {setSchoolId} = schoolIdSlice.actions;
export const schoolIdReducer = schoolIdSlice.reducer;