import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then((m) => m.Login),
    },
    {
        path: 'clients',
        loadComponent: () => import('./pages/clients/clients').then((m) => m.Clients),
        canActivate: [authGuard]
    },
];
