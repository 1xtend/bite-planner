import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorage } from '../../shared/models/enums/local-storage.enum';

describe('TokenService', () => {
  let service: TokenService;
  let cookieService: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CookieService]
    });
    service = TestBed.inject(TokenService);
    cookieService = TestBed.inject(CookieService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cookieService.delete(LocalStorage.Token);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save token in cookies when setToken is called', () => {
    const token = 'mytoken';
    const setSpy = jest.spyOn(cookieService, 'set');

    service.setToken(token);

    expect(setSpy).toHaveBeenCalledWith(LocalStorage.Token, token, { path: '/', secure: true, sameSite: 'Lax' });
  });

  it('should return token from cookies when getToken is called', () => {
    const token = 'mytoken';

    cookieService.set(LocalStorage.Token, token);

    expect(service.getToken()).toBe(token);
  });

  it('should remove token from cookies when deleteToken is called', () => {
    const token = 'mytoken';
    cookieService.set(LocalStorage.Token, token);

    expect(service.getToken()).toBe(token);

    service.deleteToken();
    expect(cookieService.get(LocalStorage.Token)).toBe('');
  });

  // TODO: write spec for isTokenExpired function
});
