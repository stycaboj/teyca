import { Component, input, InputSignal } from '@angular/core';

@Component({
    selector: 'button[teyca-button]',
    imports: [],
    templateUrl: './button.html',
    styleUrl: './button.scss',
})
export class Button {
    public text: InputSignal<string> = input<string>('');
}
