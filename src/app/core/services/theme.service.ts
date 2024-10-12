import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Theme } from '../../shared/models/types/theme.type';
import { LocalStorage } from '../../shared/models/enums/local-storage.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new Subject<Theme>();
  theme$ = this.themeSubject.asObservable();

  setTheme(theme: Theme): void {
    const linkEl = document.getElementById('app-theme') as HTMLLinkElement | null;
    if (!linkEl) {
      throw new Error('There is no "app-theme" element on the page.');
    }

    linkEl.href = `lara-${ theme }-green.css`;
    localStorage.setItem(LocalStorage.Theme, theme);
    this.themeSubject.next(theme);
  }
}
