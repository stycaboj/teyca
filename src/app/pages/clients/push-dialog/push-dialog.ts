import { Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TeycaButton } from '../../../shared/ui/button/button';
import { PushService } from '../../../core/services/push.service';
import { injectContext } from '@taiga-ui/polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { TeycaSelect } from '../../../shared/ui/select/select';
import { SelectOption } from '../../../core/types/select.types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Error } from '../../../shared/ui/error/error';

@Component({
    selector: 'app-push-dialog',
    imports: [TranslatePipe, TeycaButton, TeycaSelect, Error],
    templateUrl: './push-dialog.html',
    styleUrl: './push-dialog.scss',
})
export class PushDialog {
    private readonly _pushService: PushService = inject(PushService);
    public readonly context: TuiDialogContext<boolean, { userIds: number[] }> =
        injectContext<TuiDialogContext<boolean, { userIds: number[] }>>();
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);

    protected message: WritableSignal<string> = signal('');
    protected selectedDate: WritableSignal<'now' | '1hour' | 'tomorrow'> = signal<
        'now' | '1hour' | 'tomorrow'
    >('now');
    protected messageTouched: WritableSignal<boolean> = signal(false);

    protected dateOptions: SelectOption[] = [
        { value: 'now', label: 'Сейчас' },
        { value: '1hour', label: 'Через 1 час' },
        { value: 'tomorrow', label: 'Завтра' },
    ];

    protected onMessageInput(value: string): void {
        this.message.set(value);
    }

    protected changeDate(value: string): void {
        this.selectedDate.set(value as 'now' | '1hour' | 'tomorrow');
    }

    protected close(): void {
        this.context.completeWith(false);
    }

    protected send(): void {
        this.messageTouched.set(true);

        if (!this.message().trim()) {
            return;
        }

        this._pushService
            .sendPush({
                message: this.message(),
                user_ids: this.context.data.userIds,
                scheduled_at: this.getScheduledAt(),
            })
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe({
                next: (result) => {
                    this.context.completeWith(true);
                },
                error: (error) => {
                    console.log('Error:', error);
                },
            });
    }

    private getScheduledAt(): string | undefined {
        const selected: string = this.selectedDate();
        const now: Date = new Date();

        switch (selected) {
            case '1hour':
                return new Date(now.setHours(now.getHours() + 1)).toISOString();
            case 'tomorrow':
                return new Date(now.setDate(now.getDate() + 1)).toISOString();
            default:
                return new Date(now.setDate(now.getDate())).toISOString();
        }
    }
}
