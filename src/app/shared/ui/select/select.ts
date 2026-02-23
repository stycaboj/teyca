import { ChangeDetectionStrategy, Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { SelectOption } from '../../../core/types/select.types';

@Component({
    selector: 'teyca-select',
    imports: [],
    templateUrl: './select.html',
    styleUrl: './select.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeycaSelect {
    public readonly value: InputSignal<string> = input<string>('');
    public readonly options: InputSignal<SelectOption[]> = input<SelectOption[]>([]);

    public readonly valueChange: OutputEmitterRef<string> = output<string>();

    protected onChange(event: Event): void {
        const target: EventTarget | null = event.target;
        if (!(target instanceof HTMLSelectElement)) {
            return;
        }
        const select: HTMLSelectElement = target;
        this.valueChange.emit(select.value);
    }
}
