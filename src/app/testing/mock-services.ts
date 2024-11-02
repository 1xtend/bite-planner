import { BehaviorSubject, of } from 'rxjs';
import { Theme } from '../shared/models/types/theme.type';
import { Language } from '../shared/models/types/language.type';
import { mockDynamicDialogRef } from './test-helpers';
import { TokenService } from '../core/services/token.service';
import { DialogManagerService } from '../core/services/dialog-manager.service';
import { DialogService } from 'primeng/dynamicdialog';
import { LocaleService } from '../core/services/locale.service';
import { ThemeService } from '../core/services/theme.service';
import { AuthService } from '../core/services/auth.service';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

// ThemeService
export const mockThemeService = {
  theme$: new BehaviorSubject<Theme>('light'),
  setTheme: jest.fn(),
  getSavedTheme: jest.fn()
} as unknown as jest.Mocked<ThemeService>;

// AuthService
export const mockAuthService = {
  user$: of({})
} as unknown as jest.Mocked<AuthService>;

// Firebase
export const mockAuth = {} as Auth;
export const mockFirestore = {} as Firestore;

// ActivatedRoute
export const mockActivatedRoute = {};

// LocaleService
export const mockLocaleService = {
  language$: new BehaviorSubject<Language>('en'),
  setLanguage: jest.fn(),
  getSavedLanguage: jest.fn()
} as unknown as jest.Mocked<LocaleService>;

// DialogService
export const mockDialogService = {
  open: jest.fn().mockReturnValue(mockDynamicDialogRef),
  close: jest.fn()
} as unknown as jest.Mocked<DialogService>;

// DialogManagerService
export const mockDialogManager = {
  dialogRef: <any>undefined,
  openDialog: jest.fn(),
  closeDialog: jest.fn()
} as unknown as jest.Mocked<DialogManagerService>;

// TokenService
export const mockTokenService = {
  setToken: jest.fn(),
  getToken: jest.fn(),
  deleteToken: jest.fn(),
  isTokenExpired: jest.fn()
} as unknown as jest.Mocked<TokenService>;

// HttpErrorService
export const mockHttpErrorService = {
  handleError: jest.fn()
};

// NotificationService
export const mockNotificationService = {
  showMessage: jest.fn()
};

// FormErrorService
export const mockFormErrorService = {
  handleFormError: jest.fn()
};

// MessageService
export const mockMessageService = {
  add: jest.fn()
};
