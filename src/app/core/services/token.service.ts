import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorage } from '../../shared/models/enums/local-storage.enum';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private cookieService = inject(CookieService);

  constructor() {
  }

  setToken(token: string): void {
    this.cookieService.set(LocalStorage.Token, token, { path: '/', secure: true });
  }

  getToken(): string | null {
    return this.cookieService.get(LocalStorage.Token);
  }

  deleteToken(): void {
    this.cookieService.delete(LocalStorage.Token);
  }

  isTokenExpired(token: string): boolean {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() * 1000);

    return decodedToken.exp ? decodedToken.exp < currentTime : false;
  }
}
