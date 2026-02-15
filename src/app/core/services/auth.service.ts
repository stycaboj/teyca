import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { LoginData, LoginResponse } from '../types/login.types';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly _http: HttpClient = inject(HttpClient);
    private readonly _router: Router = inject(Router);
    private readonly _apiUrl: string = 'https://api.teyca.ru/test-auth-only';

    private readonly _auth_token: WritableSignal<string | null> = signal<string | null>(
        localStorage.getItem('auth_token')
    );

    public get authToken(): string {
        return this._auth_token() ?? '';
    }

    public get isAuthenticated(): boolean {
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
                console.log('Error:', err);
            },
        });
    }

    public logout(): void {
        localStorage.removeItem('auth_token');
        this._auth_token.set(null);
        this._router.navigate(['/login']);
    }
}
