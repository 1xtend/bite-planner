import { Component, inject, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-display-control-error',
  standalone: true,
  imports: [],
  templateUrl: './display-control-error.component.html',
  styleUrl: './display-control-error.component.scss'
})
export class DisplayControlErrorComponent {
  control = input.required<AbstractControl>();
  errors: string[] = ['email', 'password']
}
