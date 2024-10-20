import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-display-control-error',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './display-control-error.component.html',
  styleUrl: './display-control-error.component.scss'
})
export class DisplayControlErrorComponent {
  control = input.required<AbstractControl>();
  errors: string[] = ['email', 'username', 'required'];
}
