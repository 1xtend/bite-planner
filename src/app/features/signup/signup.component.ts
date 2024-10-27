import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupForm } from '../../shared/models/interfaces/signup-form.interface';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordInputComponent } from '../../shared/components/password-input/password-input.component';
import { usernameValidator } from '../../core/validators/username.validator';
import {
  DisplayControlErrorComponent
} from '../../shared/components/display-control-error/display-control-error.component';
import { emailValidator } from '../../core/validators/email.validator';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { passwordValidator } from '../../core/validators/password.validator';
import { PasswordConditionsComponent } from '../../shared/components/password-conditions/password-conditions.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SignupFormValue } from '../../shared/models/types/signup-form-value.type';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CardModule,
    TranslateModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordInputComponent,
    DisplayControlErrorComponent,
    IconFieldModule,
    InputIconModule,
    TooltipModule,
    PasswordConditionsComponent,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent {
  private fb = inject(FormBuilder).nonNullable;
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal<boolean>(false);

  signupForm = this.fb.group<SignupForm>({
    username: this.fb.control('', [Validators.required, usernameValidator()]),
    email: this.fb.control('', [Validators.required, emailValidator()]),
    password: this.fb.control('', [Validators.required, passwordValidator()])
  });

  onSubmit(): void {
    if (this.signupForm.invalid || this.signupForm.pending || this.loading()) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const value: SignupFormValue = this.signupForm.getRawValue();
    this.loading.set(true);

    this.authService.signup(value, this.signupForm).subscribe({
      next: () => {
        this.loading.set(false);
        this.signupForm.reset();
        this.router.navigate(['/home']);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}
