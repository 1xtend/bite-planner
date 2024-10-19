import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
    PasswordInputComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private fb = inject(FormBuilder).nonNullable;

  loginForm = this.fb.group<LoginForm>({
    email: this.fb.control('', [Validators.required, emailValidator()]),
    password: this.fb.control('', [Validators.required])
  }, { updateOn: 'blur' });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log(this.loginForm.getRawValue());
  }
}
