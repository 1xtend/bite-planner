import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'app-theme-switch',
  standalone: true,
  imports: [
    IconButtonComponent
  ],
  templateUrl: './theme-switch.component.html',
  styleUrl: './theme-switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSwitchComponent {
  toggle(): void {

  }
}