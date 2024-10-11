import { of } from 'rxjs';

// ThemeService
export const mockThemeService = {
  theme$: of(''),
  setTheme: jest.fn()
};
