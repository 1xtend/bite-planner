import { BehaviorSubject, of } from 'rxjs';
import { Theme } from '../shared/models/types/theme.type';

// ThemeService
export const mockThemeService = {
  theme$: new BehaviorSubject<Theme>('light'),
  setTheme: jest.fn()
};

// AuthService
export const mockAuthService = {
  user$: of({})
};

// FirebaseAuth
export const mockFirebaseAuth = {};
