import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { AuthService } from './auth.service';
import { ClientData, ClientsParams, ClientsResponse } from '../types/clients.types';
import { RequestOptions } from '../types/http.types';

@Injectable({
    providedIn: 'root',
})
export class ClientsService {
    private readonly _http: HttpClient = inject(HttpClient);
    private readonly _authService: AuthService = inject(AuthService);
    private readonly _baseUrl: string = 'https://api.teyca.ru/v1';

    private readonly _clients: WritableSignal<ClientData[]> = signal<ClientData[]>([]);
    private readonly _loading: WritableSignal<boolean> = signal<boolean>(false);
    private readonly _total: WritableSignal<number> = signal<number>(0);
    private readonly _error: WritableSignal<string | null> = signal<string | null>(null);

    public readonly clients: Signal<ClientData[]> = this._clients.asReadonly();
    public readonly loading: Signal<boolean> = this._loading.asReadonly();
    public readonly total: Signal<number> = this._total.asReadonly();
    public readonly error: Signal<string | null> = this._error.asReadonly();

    public loadClients(params: ClientsParams = {}): void {
        const token: string = this._authService.authToken;

        if (!token) {
            this._error.set('Token is undefined');
            return;
        }

        this._error.set(null);
        this._loading.set(true);

        let httpParams: HttpParams = new HttpParams();
        if (params.limit !== undefined) {
            httpParams = httpParams.set('limit', params.limit.toString());
        }
        if (params.offset !== undefined) {
            httpParams = httpParams.set('offset', params.offset.toString());
        }
        if (params.search) {
            httpParams = httpParams.set('search', params.search);
        }

        const url: string = `${this._baseUrl}/${token}/passes`;

        const options: RequestOptions = {
            params: httpParams,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
        };

        this._http.get<ClientsResponse>(url, options).subscribe({
            next: (response) => {
                this._clients.set(response.passes);
                this._total.set(response.meta.size);
                this._loading.set(false);
            },
            error: (err) => {
                console.error('Error loading clients :', err);
                this._error.set('Failed to load clients');
                this._loading.set(false);
            },
        });
    }
}
