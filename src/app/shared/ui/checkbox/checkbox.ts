import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';

@Component({
    selector: 'teyca-checkbox',
    imports: [],
    templateUrl: './checkbox.html',
    styleUrl: './checkbox.scss',
})
export class TeycaCheckbox {
    public readonly checked: InputSignal<boolean> = input<boolean>(false);
    public readonly checkedChange: OutputEmitterRef<boolean> = output<boolean>();

    protected onChange(event: Event): void {
        const target: EventTarget | null = event.target;
        if (!(target instanceof HTMLInputElement)) {
            return;
        }
        const checked: boolean = target.checked;
        this.checkedChange.emit(checked);
    }
}
