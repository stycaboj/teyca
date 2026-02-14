import { ChangeDetectionStrategy, Component, input, InputSignal, model, ModelSignal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'teyca-input',
    imports: [TranslatePipe],
    templateUrl: './input.html',
    styleUrl: './input.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Input implements FormValueControl<string> {
    public value: ModelSignal<string> = model<string>('');
    public type: InputSignal<'text' | 'password'> = input.required<'text' | 'password'>();
    public placeholder: InputSignal<string> = input<string>('');
}
