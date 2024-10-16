import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layout/header/header.component';
import { ThemeService } from './core/services/theme.service';
import { LocalStorage } from './shared/models/enums/local-storage.enum';
import { Theme } from './shared/models/types/theme.type';
import { AuthService } from './core/services/auth.service';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);
  private authService = inject(AuthService);
  private router = inject(Router);

  private routesWithoutWrapper: string[] = ['/login'];

  hideWrapper$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event: any) => this.routesWithoutWrapper.includes(event.url)),
    distinctUntilChanged()
  );

  ngOnInit(): void {
    this.setSavedTheme();
  }

  private setSavedTheme(): void {
    const theme = localStorage.getItem(LocalStorage.Theme) as Theme | null;
    this.themeService.setTheme(theme || 'light');
  }
}
