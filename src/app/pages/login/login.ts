import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Input } from '../../shared/ui/input/input';
import { FieldTree, form, FormField, required } from '@angular/forms/signals';
import { LoginData } from './login.types';
import { Button } from '../../shared/ui/button/button';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-login',
    imports: [TranslatePipe, Input, FormField, Button],
    templateUrl: './login.html',
    styleUrl: './login.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
    private readonly authService: AuthService = inject(AuthService);
    private readonly translateService: TranslateService = inject(TranslateService);

    public loginModel: WritableSignal<LoginData> = signal({
        login: '',
        password: '',
    });

    public loginForm: FieldTree<LoginData> = form(this.loginModel, (schemaPath) => {
        required(schemaPath.login, {
            message: this.translateService.instant('login.input.required'),
        });
        required(schemaPath.password, {
            message: this.translateService.instant('login.input.required'),
        });
    });

    public login(): void {
        if (this.loginForm().valid()) {
            this.authService.login(this.loginForm().value());
        }
    }
}
