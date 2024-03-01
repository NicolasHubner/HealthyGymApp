import { createSlice } from '@reduxjs/toolkit';
import { initialState, fineShapeReducer } from './reducers';

export const fineShape = createSlice({
    name: 'fineshape',
    initialState,
    reducers: fineShapeReducer,
});

export const { setFineShapeIntoState } = fineShape.actions;

export default fineShape.reducer;
