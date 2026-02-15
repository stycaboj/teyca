import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TeycaInput } from '../../shared/ui/input/input';
import { FieldTree, form, FormField, required } from '@angular/forms/signals';
import { LoginData } from '../../core/types/login.types';
import { TeycaButton } from '../../shared/ui/button/button';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-login',
    imports: [TranslatePipe, TeycaInput, FormField, TeycaButton],
    templateUrl: './login.html',
    styleUrl: './login.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
    private readonly _authService: AuthService = inject(AuthService);
    private readonly _translateService: TranslateService = inject(TranslateService);

    public loginModel: WritableSignal<LoginData> = signal({
        login: '',
        password: '',
    });

    public loginForm: FieldTree<LoginData> = form(this.loginModel, (schemaPath) => {
        required(schemaPath.login, {
            message: this._translateService.instant('login.input.required'),
        });
        required(schemaPath.password, {
            message: this._translateService.instant('login.input.required'),
        });
    });

    public login(): void {
        if (this.loginForm().valid()) {
            this._authService.login(this.loginForm().value());
        }
    }
}
