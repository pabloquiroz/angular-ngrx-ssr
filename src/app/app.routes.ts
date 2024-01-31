import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'core', pathMatch: 'full' },
    {
        path: 'core',
        loadComponent: () => import('./core/core.component').then(m => m.CoreComponent)
    }
];
