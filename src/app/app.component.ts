import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layout/header/header.component';
import { ThemeService } from './core/services/theme.service';
import { LocaleService } from './core/services/locale.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);
  private localeService = inject(LocaleService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.setSavedTheme();
    this.setSavedLanguage();

    this.authService.authenticated$.subscribe((value) => {
      console.log('Authenticated: ', value);
    });

    this.authService.user$.subscribe((user) => {
      console.log('User: ', user);
    });
  }

  private setSavedTheme(): void {
    const theme = this.themeService.getSavedTheme();
    this.themeService.setTheme(theme);
  }

  private setSavedLanguage(): void {
    const language = this.localeService.getSavedLanguage();
    this.localeService.setLanguage(language);
  }

  signout(): void {
    this.authService.signout().subscribe();
  }
}
