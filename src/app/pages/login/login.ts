import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TeycaInput } from '../../shared/ui/input/input';
import { FieldTree, form, FormField, required, submit } from '@angular/forms/signals';
import { LoginData } from '../../core/types/login.types';
import { TeycaButton } from '../../shared/ui/button/button';
import { AuthService } from '../../core/services/auth.service';
import { Error } from '../../shared/ui/error/error';

@Component({
    selector: 'app-login',
    imports: [TranslatePipe, TeycaInput, FormField, TeycaButton, Error],
    templateUrl: './login.html',
    styleUrl: './login.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
    private readonly _authService: AuthService = inject(AuthService);

    public loginModel: WritableSignal<LoginData> = signal({
        login: '',
        password: '',
    });

    public loginForm: FieldTree<LoginData> = form(this.loginModel, (schemaPath) => {
        required(schemaPath.login);
        required(schemaPath.password);
    });

    public login(): void {
        submit(this.loginForm, async () => this._authService.login(this.loginForm().value()));
    }
}
