import { isDevMode } from "@angular/core"
import { ActionReducerMap, MetaReducer } from "@ngrx/store"
import { counterReducer } from "./reducers/counter.reducer";
import { walletReducer } from "./reducers/wallets-reducer";

export interface State {};


export const reducers: ActionReducerMap<any> = {
    counter: counterReducer,
    wallets: walletReducer
};

export const metaReducers: MetaReducer<State>[] = isDevMode()? [] : [];