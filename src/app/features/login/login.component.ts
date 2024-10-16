import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { emailValidator } from '../../core/validators/email.validator';
import { passwordValidator } from '../../core/validators/password.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    TranslateModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private fb = inject(FormBuilder).nonNullable;

  authForm = this.fb.group({
    email: this.fb.control('', [Validators.required, emailValidator()]),
    password: this.fb.control('', [Validators.required, passwordValidator()])
  });
}
