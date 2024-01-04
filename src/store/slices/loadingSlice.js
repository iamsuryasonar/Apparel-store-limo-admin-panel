import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: false,
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.value = action.payload;
        }
    }
})

const { reducer, actions } = loadingSlice;
export const { setLoading } = actions;
export default reducer;