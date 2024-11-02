import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layout/header/header.component';
import { ThemeService } from './core/services/theme.service';
import { LocaleService } from './core/services/locale.service';
import { SidebarComponent } from './shared/layout/sidebar/sidebar.component';
import { ToastModule } from 'primeng/toast';
import { AuthService } from './core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);
  private localeService = inject(LocaleService);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.authChanges();
    this.setSavedTheme();
    this.setSavedLanguage();
  }

  private setSavedTheme(): void {
    const theme = this.themeService.getSavedTheme();
    this.themeService.setTheme(theme);
  }

  private setSavedLanguage(): void {
    const language = this.localeService.getSavedLanguage();
    this.localeService.setLanguage(language);
  }

  private authChanges(): void {
    this.authService.authChanges().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
