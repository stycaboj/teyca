import {
    Component,
    computed,
    DestroyRef,
    inject,
    OnInit,
    Signal,
    signal,
    WritableSignal,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TuiTable } from '@taiga-ui/addon-table';
import { ClientsService } from '../../core/services/clients.service';
import { ClientData } from '../../core/types/clients.types';
import { DatePipe } from '@angular/common';
import { DashPipe } from '../../core/pipes/dash-pipe';
import { TeycaInput } from '../../shared/ui/input/input';
import { TeycaButton } from '../../shared/ui/button/button';
import { debounceTime, distinctUntilChanged, Observable, skip } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { PushDialog } from './push-dialog/push-dialog';
import { TeycaCheckbox } from '../../shared/ui/checkbox/checkbox';
import { Error } from '../../shared/ui/error/error';

@Component({
    selector: 'app-clients',
    imports: [
        TranslatePipe,
        TuiTable,
        DatePipe,
        DashPipe,
        TeycaInput,
        TeycaButton,
        TeycaCheckbox,
        Error,
    ],
    templateUrl: './clients.html',
    styleUrl: './clients.scss',
})
export class Clients implements OnInit {
    private readonly _clientsService: ClientsService = inject(ClientsService);
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);
    private readonly _dialogs: TuiDialogService = inject(TuiDialogService);

    public readonly clients: Signal<ClientData[]> = this._clientsService.clients;
    public readonly loading: Signal<boolean> = this._clientsService.loading;
    public readonly total: Signal<number> = this._clientsService.total;
    public readonly error: Signal<string | null> = this._clientsService.error;

    public readonly currentPage: WritableSignal<number> = signal<number>(1);
    public readonly pageSize: WritableSignal<number> = signal<number>(10);
    public readonly searchQuery: WritableSignal<string> = signal<string>('');

    public readonly selectedIds: WritableSignal<number[]> = signal<number[]>([]);
    public readonly showNoSelectedIdsError: WritableSignal<boolean> = signal<boolean>(false);

    public totalPages: Signal<number> = computed(() => Math.ceil(this.total() / this.pageSize()));
    public startItem: Signal<number> = computed(
        () => (this.currentPage() - 1) * this.pageSize() + 1
    );
    public endItem: Signal<number> = computed(() =>
        Math.min(this.currentPage() * this.pageSize(), this.total())
    );

    private readonly searchQuery$: Observable<string> = toObservable(this.searchQuery);

    public ngOnInit(): void {
        this.loadClients();

        this.searchQuery$
            .pipe(debounceTime(300), distinctUntilChanged(), skip(1), takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                this.currentPage.set(1);
                this.loadClients();
            });
    }

    private loadClients(): void {
        const offset: number = (this.currentPage() - 1) * this.pageSize();
        const search: string | undefined = this.searchQuery()
            ? `barcode=${this.searchQuery()}`
            : undefined;

        this._clientsService.loadClients({
            limit: this.pageSize(),
            offset: offset,
            search: search,
        });
    }

    public openPushDialog(): void {
        if (this.selectedIds().length === 0) {
            this.showNoSelectedIdsError.set(true);
            setTimeout(() => this.showNoSelectedIdsError.set(false), 3000);
            return;
        }

        this._dialogs
            .open<boolean>(new PolymorpheusComponent(PushDialog), {
                dismissible: true,
                data: { userIds: this.selectedIds() },
            })
            .subscribe({
                next: (result) => {
                    if (result) {
                        this.selectedIds.set([]);
                    }
                },
            });
    }

    public toggleSelection(userId: number, event: Event): void {
        const target: EventTarget | null = event.target;
        if (!(target instanceof HTMLInputElement)) {
            return;
        }
        const checked: boolean = target.checked;
        this.selectedIds.update((ids) =>
            checked ? [...ids, userId] : ids.filter((id) => id !== userId)
        );
    }

    public toggleAll(event: Event): void {
        const target: EventTarget | null = event.target;
        if (!(target instanceof HTMLInputElement)) {
            return;
        }
        const checked: boolean = target.checked;
        if (checked) {
            this.selectedIds.set(this.clients().map((c) => c.user_id));
        } else {
            this.selectedIds.set([]);
        }
    }

    public getAverageBill(client: ClientData): string {
        const summ: number = parseFloat(client.summ_all ?? '0') || 0;
        const visits: number = parseFloat(client.visits_all ?? '1') || 1;

        if (visits === 0) return '—';

        const average: number = summ / visits;
        return average.toString();
    }

    public getLink(client: ClientData): string {
        return 'https://cards.teyca.ru/download/' + client.link;
    }

    public changePageSize(size: number): void {
        this.pageSize.set(size);
        this.currentPage.set(1);
        this.loadClients();
    }

    public goToFirstPage(): void {
        if (this.currentPage() !== 1) {
            this.currentPage.set(1);
            this.loadClients();
        }
    }

    public goToPrevPage(): void {
        if (this.currentPage() > 1) {
            this.currentPage.update((p) => p - 1);
            this.loadClients();
        }
    }

    public goToNextPage(): void {
        if (this.currentPage() < this.totalPages()) {
            this.currentPage.update((p) => p + 1);
            this.loadClients();
        }
    }

    public goToLastPage(): void {
        const last: number = this.totalPages();
        if (this.currentPage() !== last) {
            this.currentPage.set(last);
            this.loadClients();
        }
    }
}
