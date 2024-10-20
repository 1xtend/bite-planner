import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { LocalStorage } from '../../shared/models/enums/local-storage.enum';
import { take } from 'rxjs';
import { Theme } from '../../shared/models/types/theme.type';

describe('ThemeService', () => {
  let service: ThemeService;

  function appendAppThemeElement(theme: Theme): HTMLLinkElement {
    const linkEl = document.createElement('link');
    linkEl.id = 'app-theme';
    linkEl.rel = 'stylesheet';
    linkEl.type = 'text/css';
    linkEl.href = `${ theme }.css`;
    document.head.appendChild(linkEl);
    return linkEl;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when setTheme is called', () => {
    beforeEach(() => {
      document.getElementById('app-theme')?.remove();
      localStorage.clear();
    });

    it('should throw error if app-theme element was not found', () => {
      expect(() => service.setTheme('dark')).toThrow('There is no "app-theme" element on the page.');
    });

    it('should set dark theme when received invalid theme', fakeAsync(() => {
      const linkEl = appendAppThemeElement('light');

      service.setTheme('invalid-theme' as Theme);

      service.theme$.pipe(take(1)).subscribe((theme) => {
        expect(theme).toBe('dark');
      });

      expect(linkEl.href).toContain('dark.css');
      expect(localStorage.getItem(LocalStorage.Theme)).toBe('dark');

      flush();
    }));

    it('should set dark theme', fakeAsync(() => {
      const linkEl = appendAppThemeElement('light');

      service.setTheme('dark');

      service.theme$.pipe(take(1)).subscribe((theme) => {
        expect(theme).toBe('dark');
      });

      expect(linkEl.href).toContain('dark.css');
      expect(localStorage.getItem(LocalStorage.Theme)).toBe('dark');

      flush();
    }));

    it('should set light theme', fakeAsync(() => {
      const linkEl = appendAppThemeElement('dark');

      service.setTheme('light');

      service.theme$.pipe(take(1)).subscribe((theme) => {
        expect(theme).toBe('light');
      });

      expect(linkEl.href).toContain('light.css');
      expect(localStorage.getItem(LocalStorage.Theme)).toBe('light');

      flush();
    }));
  });
});
