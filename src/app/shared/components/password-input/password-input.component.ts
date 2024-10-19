import { ChangeDetectionStrategy, Component, forwardRef, input, model, signal } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

type OnChange = (value: string) => void;
type OnTouched = () => void

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [
    PasswordModule,
    FormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true
    }
  ],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordInputComponent implements ControlValueAccessor {
  inputId = input<string>('');

  onChange: OnChange = (value: string) => {
  };
  onTouched: OnTouched = () => {
  };

  value = model<string>('');
  disabled = signal<boolean>(false);

  writeValue(value: string): void {
    this.value.set(value || '');
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled.set(isDisabled);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
