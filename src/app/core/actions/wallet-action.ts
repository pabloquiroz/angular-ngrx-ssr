import { createAction, props } from "@ngrx/store";
import { Wallet } from "../interfaces/wallet.interface";

export const create = createAction('[Wallet] Create', props<{ payload: Wallet}>());
export const reset = createAction('[Wallet] Reset');
export const remove = createAction('[Wallet] Remove', props<{ id: string}>());
export const update = createAction('[Wallet] Update', props<{ id: string, payload: Wallet}>());

export const loadData = createAction('[Wallets Api] Load Wallets');
export const loadDataSuccess = createAction('[Wallets API] Wallets Loaded Success', props<{ projects: Wallet[]}>());
export const loadDataFailure = createAction('[Wallets Api] Wallets Loaded Error', props<{ payload: Wallet[]}>());
