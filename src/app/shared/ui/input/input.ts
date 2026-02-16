import { ChangeDetectionStrategy, Component, input, InputSignal, model, ModelSignal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
    selector: 'teyca-input',
    imports: [],
    templateUrl: './input.html',
    styleUrl: './input.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TeycaInput implements FormValueControl<string> {
    public value: ModelSignal<string> = model<string>('');
    public type: InputSignal<'text' | 'password'> = input.required<'text' | 'password'>();
    public placeholder: InputSignal<string> = input<string>('');
}
