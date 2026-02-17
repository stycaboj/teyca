import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { PushBody, PushData, PushResponse } from '../types/push.types';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PushService {
    private readonly _http: HttpClient = inject(HttpClient);
    private readonly _authService: AuthService = inject(AuthService);
    private readonly _baseUrl: string = 'https://api.teyca.ru/v1';

    public sendPush(data: PushData): Observable<PushResponse> {
        const token: string = this._authService.authToken;
        const url: string = `${this._baseUrl}/${token}/message/push`;

        const body: PushBody = {
            user_id: data.user_ids.join(','),
            push_message: data.message,
            date_start: data.scheduled_at,
        };

        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: token,
        });

        return this._http.post<PushResponse>(url, body, { headers });
    }
}
