import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then((m) => m.Login),
    },
    { // TODO: Страница с клиентами должна быть доступна только авторизованным пользователям. При отсутствии токена пользователь должен быть перенаправлен на страницу входа
        path: 'clients',
        loadComponent: () => import('./pages/clients/clients').then((m) => m.Clients),
    },
];
