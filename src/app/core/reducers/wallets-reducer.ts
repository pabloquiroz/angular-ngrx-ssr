import { createReducer, on, Action } from '@ngrx/store';
import { create, loadData, loadDataFailure, loadDataSuccess, remove, reset, update } from '../actions/wallet-action';
import { WalletState } from '../interfaces/wallet-state-interface';

export const initialState: WalletState = {
    wallets: [],
    loading: false
};
export const walletReducer = createReducer(
    initialState,
    on(reset, (state) => ({...state, loading: true })),
    on(loadData, (state) => ({...state, loading: true })),
    on(loadDataSuccess, (state, action) => {
        return {
          ...state, 
          wallets: action.projects,
          loading: false
        }
      }),
    on(loadDataFailure, state => ({...state, loading: false })),
    on(create, (state, { payload }) => ({...state, wallets: [...state.wallets, payload] })),
    on(remove, (state, { id }) => ({...state, wallets: state.wallets.filter(w => w.id!== id) })),
    // I need create one update reducer for each entity
    on(update, (state, { id, payload }) => ({...state, wallets: state.wallets.map(w => w.id === id? payload : w) }))
)





