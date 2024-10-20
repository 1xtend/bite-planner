import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-password-conditions',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    TranslateModule
  ],
  templateUrl: './password-conditions.component.html',
  styleUrl: './password-conditions.component.scss'
})
export class PasswordConditionsComponent {
  control = input.required<AbstractControl>();
}
