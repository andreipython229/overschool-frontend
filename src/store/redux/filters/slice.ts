import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface FiltersState {
    status: string;
    course_name: string;
    homework_name: string;
    start_mark: string | number;
    end_mark: string | number;
    start_date: string | number;
    end_date: string | number;
}

type FiltersSliceState = {
    filters: { [key: string]: string | number };
    chips: { [key: string]: string | number };
};

const initialState: FiltersSliceState = {
    filters: {
        status: 'Все статусы',
        course_name: '',
        homework_name: '',
        start_mark: '',
        end_mark: '',
        start_date: '',
        end_date: '',
    },
    chips: {},
};

export const slice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        addFilters: (state, action: PayloadAction<{ [key: string]: string | number }>) => {
            const {payload} = action;
            state.filters = {...state.filters, ...payload};
        },
        clearFilters: (state) => {
            state.filters = {...initialState.filters};
        },
        removeFilter: (state, action: PayloadAction<string>) => {
            const filterKey = action.payload as keyof FiltersState;
            if (state.filters[filterKey]) {
                state.filters[filterKey] = '';
            }
        },
        addChip: (state, action: PayloadAction<{ [key: string]: string | number }>) => {
            state.chips = {...state.chips, ...action.payload};
        },
        removeChip: (state, action: PayloadAction<string>) => {
            const filterKey = action.payload as keyof FiltersState;
            delete state.chips[filterKey];
        },
    },
});

export const {addFilters, clearFilters, removeFilter, addChip, removeChip} = slice.actions;

export const filtersReducer = slice.reducer;
