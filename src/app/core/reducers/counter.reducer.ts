import { createReducer, on } from "@ngrx/store";
import { decrement, increment, reset } from "../actions/counter.actions";


export const initialState = 8;


export const counterReducer = createReducer(
    initialState,
    on(increment, state => state + 1),
    on(decrement, state => state - 1),
    on(reset, () => initialState),
)