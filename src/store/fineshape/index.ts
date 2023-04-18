import { createSlice } from '@reduxjs/toolkit';
import { initialState, fineShapeReducer } from './reducers';

export const fineShape = createSlice({
    name: 'fineshape',
    initialState,
    reducers: fineShapeReducer,
});

export const { setFineshapInfo } = fineShape.actions;

export default fineShape.reducer;
