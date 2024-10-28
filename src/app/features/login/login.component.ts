import { Component, inject, signal } from '@angular/core';
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
import { Router, RouterLink } from '@angular/router';
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
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder).nonNullable;
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal<boolean>(false);

  loginForm = this.fb.group<LoginForm>({
    email: this.fb.control('', {
      validators: [Validators.required, emailValidator()],
      updateOn: 'blur'
    }),
    password: this.fb.control('', [Validators.required])
  });

  onSubmit(): void {
    if (this.blockSubmit()) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const value: LoginFormValue = this.loginForm.getRawValue();

    this.loading.set(true);

    this.authService.login(value, this.loginForm).subscribe({
      next: () => {
        this.loading.set(false);
        this.loginForm.reset();
        this.router.navigate(['/home']);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  private blockSubmit(): boolean {
    return this.loginForm.invalid || this.loginForm.pending || this.loading();
  }
}
