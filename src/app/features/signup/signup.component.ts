import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { RouterLink } from '@angular/router';

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

  signupForm = this.fb.group<SignupForm>({
    username: this.fb.control('', {
      validators: [Validators.required, usernameValidator()],
      updateOn: 'blur'
    }),
    email: this.fb.control('', {
      validators: [Validators.required, emailValidator()],
      updateOn: 'blur'
    }),
    password: this.fb.control('', [Validators.required, passwordValidator()])
  });

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    console.log(this.signupForm.getRawValue());
  }
}
