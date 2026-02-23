import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'teyca-error',
  imports: [],
  templateUrl: './error.html',
  styleUrl: './error.scss',
      changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Error {
    public readonly text: InputSignal<string> = input.required<string>();
}
