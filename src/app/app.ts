import { TuiRoot } from "@taiga-ui/core";
import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, TuiRoot],
    templateUrl: './app.html',
    styleUrl: './app.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
    protected readonly title: WritableSignal<string> = signal<string>('teyca');
}
