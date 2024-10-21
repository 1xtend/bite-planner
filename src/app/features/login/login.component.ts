import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { emailValidator } from '../../core/validators/email.validator';
import { LoginForm } from '../../shared/models/interfaces/login-form.interface';
import {
  DisplayControlErrorComponent
} from '../../shared/components/display-control-error/display-control-error.component';
import { PasswordInputComponent } from '../../shared/components/password-input/password-input.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginFormValue } from '../../shared/models/types/login-form-value.type';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    TranslateModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    DisplayControlErrorComponent,
    PasswordInputComponent,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private fb = inject(FormBuilder).nonNullable;
  private authService = inject(AuthService);

  loading = signal<boolean>(false);

  loginForm = this.fb.group<LoginForm>({
    email: this.fb.control('', [Validators.required, emailValidator()]),
    password: this.fb.control('', [Validators.required])
  }, { updateOn: 'blur' });

  onSubmit(): void {
    if (this.loginForm.invalid || this.loading()) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const value: LoginFormValue = this.loginForm.getRawValue();

    this.loginForm.disable();
    this.loading.set(true);
    console.log('value', value);

    this.authService.login(value).subscribe({
      next: (response) => {
        console.log('Success Login', response);
        this.loginForm.enable();
        this.loading.set(false);
        this.loginForm.reset();
      },
      error: () => {
        this.loginForm.enable();
        this.loading.set(false);
      }
    });
  }
}
