import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
        removeHeaderId: (state) => {
          return {
            headerId: null,
          }
    },
    },

});

export const {setHeaderId, removeHeaderId} = headerIdSlice.actions;
export const headerIdReducer = headerIdSlice.reducer;