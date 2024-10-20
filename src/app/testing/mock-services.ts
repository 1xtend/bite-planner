import { BehaviorSubject, of } from 'rxjs';
import { Theme } from '../shared/models/types/theme.type';
import { Language } from '../shared/models/types/language.type';
import { mockDynamicDialogRef } from './test-helpers';

// ThemeService
export const mockThemeService = {
  theme$: new BehaviorSubject<Theme>('light'),
  setTheme: jest.fn(),
  getSavedTheme: jest.fn()
};

// AuthService
export const mockAuthService = {
  user$: of({})
};

// FirebaseAuth
export const mockFirebaseAuth = {};

// ActivatedRoute
export const mockActivatedRoute = {};

// LocaleService
export const mockLocaleService = {
  language$: new BehaviorSubject<Language>('en'),
  setLanguage: jest.fn(),
  getSavedLanguage: jest.fn()
};

// DialogService
export const mockDialogService = {
  open: jest.fn().mockReturnValue(mockDynamicDialogRef),
  close: jest.fn()
};
