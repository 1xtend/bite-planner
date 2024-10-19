import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layout/header/header.component';
import { ThemeService } from './core/services/theme.service';
import { AuthService } from './core/services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AsyncPipe, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.setSavedTheme();

    this.authService.user$.subscribe((user) => {
      console.log('User', user);
    });
  }

  private setSavedTheme(): void {
    const theme = this.themeService.getSavedTheme();
    this.themeService.setTheme(theme);
  }
}
