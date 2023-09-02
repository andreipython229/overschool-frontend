import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {h} from "msw/lib/glossary-dc3fd077";

interface HeaderIdState {
    headerId: number | null;
}

const initialState: HeaderIdState = {
    headerId: null,
};

const headerIdSlice = createSlice({
    name: 'header_id',
    initialState,
    reducers: {
        setHeaderId: (state, action: PayloadAction<number>): void => {
            state.headerId = action.payload;
        },
    },
});

export const {setHeaderId} = headerIdSlice.actions;
export const headerIdReducer = headerIdSlice.reducer;