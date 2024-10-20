import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme } from '../../shared/models/types/theme.type';
import { LocalStorage } from '../../shared/models/enums/local-storage.enum';
import { AVAILABLE_THEMES } from '../../shared/helpers/available-themes';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>(this.getSavedTheme());
  theme$ = this.themeSubject.asObservable();

  setTheme(theme: Theme): void {
    const linkEl = document.getElementById('app-theme') as HTMLLinkElement | null;
    if (!linkEl) {
      throw new Error('There is no "app-theme" element on the page.');
    }

    if (!this.isAvailableTheme(theme)) {
      theme = 'dark';
    }

    linkEl.href = `${ theme }.css`;
    localStorage.setItem(LocalStorage.Theme, theme);
    this.themeSubject.next(theme);
  }

  getSavedTheme(): Theme {
    const theme = localStorage.getItem(LocalStorage.Theme) as Theme | undefined;

    if (!theme || !this.isAvailableTheme(theme)) {
      return 'dark';
    }

    return theme;
  }

  private isAvailableTheme(theme: Theme): boolean {
    return AVAILABLE_THEMES.includes(theme);
  }
}
