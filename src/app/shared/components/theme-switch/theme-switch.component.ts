import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { ThemeService } from '../../../core/services/theme.service';
import { toSignal } from '@angular/core/rxjs-interop';

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
  private themeService = inject(ThemeService);
  private currentTheme = toSignal(this.themeService.theme$);

  toggle(): void {
    const theme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.themeService.setTheme(theme);
  }
}
