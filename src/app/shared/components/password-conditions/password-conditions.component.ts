import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-password-conditions',
  standalone: true,
  imports: [
    NgClass,
    NgTemplateOutlet,
    TranslateModule
  ],
  templateUrl: './password-conditions.component.html',
  styleUrl: './password-conditions.component.scss'
})
export class PasswordConditionsComponent {
  control = input.required<AbstractControl>();
}
