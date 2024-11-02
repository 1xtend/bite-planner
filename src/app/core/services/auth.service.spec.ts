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

describe('AuthService', () => {
  let service: AuthService;

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

  // TODO: Test auth
});
