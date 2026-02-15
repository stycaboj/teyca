import { Component, input, InputSignal } from '@angular/core';

@Component({
    selector: 'button[teyca-button]',
    imports: [],
    templateUrl: './button.html',
    styleUrl: './button.scss',
})
export class TeycaButton {
    public readonly text: InputSignal<string> = input<string>('');
    public readonly icon: InputSignal<string> = input<string>('');
}
