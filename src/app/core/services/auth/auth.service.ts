import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginData, LoginResponse } from '../../../pages/login/login.types';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _http: HttpClient = inject(HttpClient);
    private _router: Router = inject(Router);
    private readonly _apiUrl: string = 'https://api.teyca.ru/test-auth-only';

    private readonly _auth_token: WritableSignal<string | null> = signal<string | null>(
        localStorage.getItem('auth_token')
    );

    public isAuthenticated(): boolean {
        return !!this._auth_token();
    }

    public login(data: LoginData): void {
        this._http.post<LoginResponse>(this._apiUrl, data).subscribe({
            next: (res) => {
                localStorage.setItem('auth_token', res.auth_token);
                this._auth_token.set(res.auth_token);
                this._router.navigate(['/clients']);
            },
            error: (err) => {
                console.log('Ошибка:', err);
            },
        });
    }

    public logout(): void {
        localStorage.removeItem('auth_token');
        this._auth_token.set(null);
        this._router.navigate(['/login']);
    }
}
