import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupForm } from '../../shared/models/interfaces/signup-form.interface';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordInputComponent } from '../../shared/components/password-input/password-input.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CardModule,
    TranslateModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordInputComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent {
  private fb = inject(FormBuilder).nonNullable;

  signupForm = this.fb.group<SignupForm>({
    username: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required])
  });

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }

    console.log(this.signupForm.value);
  }
}
