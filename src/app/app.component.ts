import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layout/header/header.component';
import { ThemeService } from './core/services/theme.service';
import { LocalStorage } from './shared/models/enums/local-storage.enum';
import { Theme } from './shared/models/types/theme.type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);

  ngOnInit(): void {
    this.setSavedTheme();
  }

  private setSavedTheme(): void {
    const theme = localStorage.getItem(LocalStorage.Theme) as Theme | null;
    this.themeService.setTheme(theme || 'light');
  }
}
