import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginData, LoginResponse } from '../../pages/login/login.types';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _http: HttpClient = inject(HttpClient);
    private _router: Router = inject(Router);
    private readonly _apiUrl: string = 'https://api.teyca.ru/test-auth-only';

    private readonly _token: WritableSignal<string | null> = signal<string | null>(localStorage.getItem('token'));

    public login(data: LoginData): void {
        this._http.post<LoginResponse>(this._apiUrl, data).subscribe({
            next: (res) => {
                localStorage.setItem('token', res.token);
                this._token.set(res.token);
                this._router.navigate(['/clients']);
            },
            error: (err) => {
                console.log('Ошибка:', err);
            },
        });
    }

    public logout(): void {
        localStorage.removeItem('token');
        this._token.set(null);
        this._router.navigate(['/login']);
  }
}
