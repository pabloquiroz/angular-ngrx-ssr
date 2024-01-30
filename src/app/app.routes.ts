import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'core',
        loadComponent: () => import('./core/core.component').then(m => m.CoreComponent)
    }
];
