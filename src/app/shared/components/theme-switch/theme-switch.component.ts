import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { ThemeService } from '../../../core/services/theme.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-theme-switch',
  standalone: true,
  imports: [
    IconButtonComponent,
    TooltipModule,
    TranslateModule
  ],
  templateUrl: './theme-switch.component.html',
  styleUrl: './theme-switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSwitchComponent implements OnInit {
  private themeService = inject(ThemeService);
  private currentTheme = toSignal(this.themeService.theme$);
  icon = computed<string>(() => this.currentTheme() === 'light' ? 'pi pi-moon' : 'pi pi-sun');
  tooltip = computed<string>(() => `tooltip.switch-${ this.currentTheme() === 'dark' ? 'light' : 'dark' }-theme`);

  ngOnInit(): void {

  }

  toggle(): void {
    const theme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.themeService.setTheme(theme);
  }
}
