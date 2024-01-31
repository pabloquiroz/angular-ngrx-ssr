import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { metaReducers, reducers } from './core/action-reducer-map';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { WalletEffects } from './core/effects/wallet-effects';
// import from reducers

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideStore(reducers, { metaReducers }),
    provideEffects(WalletEffects),
    provideAnimations(),
    provideHttpClient(),
    provideEffects()
]
};
