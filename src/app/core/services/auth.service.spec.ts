import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import * as auth from '@angular/fire/auth';
import {
  mockAuth,
  mockFirestore,
  mockHttpErrorService,
  mockTokenService
} from '../../testing/mock-services';
import { TokenService } from './token.service';
import { HttpErrorService } from './http-error.service';
import { provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, first, of } from 'rxjs';
import { SignupFormValue } from '../../shared/models/types/signup-form-value.type';

// jest.mock('@angular/fire/auth', () => ({
//   ...jest.requireActual('@angular/fire/auth'),
//   authState: jest.fn(() => new BehaviorSubject({})),
//   createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({})),
//   signInWithEmailAndPassword: jest.fn(),
//   signOut: jest.fn()
// }));

describe('AuthService', () => {
  let service: AuthService;
  let signupFormValue: SignupFormValue = {
    email: 'test@gmail.com',
    password: 'Password1',
    username: 'test'
  };
  const user = { user: { uid: 'testUID', email: 'test@gmail.com' } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        auth.provideAuth(() => mockAuth),
        provideFirestore(() => mockFirestore),
        AuthService,
        { provide: TokenService, useValue: mockTokenService },
        { provide: HttpErrorService, useValue: mockHttpErrorService }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when signup is called', () => {
    afterEach(() => {
      signupFormValue = {
        email: 'test@gmail.com',
        password: 'Password1',
        username: 'test'
      };
    });

    it('should throw error when username is not provided', () => {
      signupFormValue = {
        ...signupFormValue,
        username: undefined as unknown as string
      };
      expect(() => service.signup(signupFormValue)).toThrow('You must provide username to signup!');
    });

    it('should return User after successful signup', () => {
      const userCredential = { user } as unknown as auth.UserCredential;
      const createSpy = jest.spyOn(auth, 'createUserWithEmailAndPassword')
      // jest.mocked(createUserWithEmailAndPassword).mockReturnValue(Promise.resolve(userCredential));
      mockHttpErrorService.handleError.mockReturnValue(of(user));

      service.signup(signupFormValue).pipe(first()).subscribe((user) => {
        expect(createSpy).toHaveBeenCalledWith(mockAuth, signupFormValue.email, signupFormValue.password);
        // expect(user).toBeTruthy();
      });
    });
  });
});
