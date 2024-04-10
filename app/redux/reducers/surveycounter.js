import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
    name: "location",
    initialState: {
        location: ['Bangalore', 'Hyderabad', 'Delhi'],
    },
    reducers: {
        save: (state, param) => {
            const { payload } = param;
            state.location = [...state.location, payload];
        },
    }
});
const { actions, reducer } = locationSlice
export const { save } = actions;
export default reducer;