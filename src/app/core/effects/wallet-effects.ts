import { Injectable } from "@angular/core";
import { WalletsService } from "../services/wallets.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { of } from "rxjs";
import { loadData, loadDataFailure, loadDataSuccess } from '../actions/wallet-action';

@Injectable()
export class WalletEffects {

    loadWallets$ = createEffect(() => this.actions$.pipe(
        ofType(loadData),
        exhaustMap(() => this.walletService.getAllWallets()
          .pipe(
            map(wallets => loadDataSuccess(wallets)),
            catchError(() => of(loadDataFailure))
          ))
        )
    );

    constructor(
        private actions$: Actions,
        private walletService: WalletsService) { }
}