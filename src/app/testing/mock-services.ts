import { of } from 'rxjs';

// ThemeService
export const mockThemeService = {
  theme$: of(''),
  setTheme: jest.fn()
};

// AuthService
export const mockAuthService = {
  user$: of({})
};

// FirebaseAuth
export const mockFirebaseAuth = {};
