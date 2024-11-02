import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorage } from '../../shared/models/enums/local-storage.enum';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private cookieService = inject(CookieService);

  setToken(token: string): void {
    this.cookieService.set(LocalStorage.Token, token, { path: '/', secure: true, sameSite: 'Lax' });
  }

  getToken(): string | null {
    return this.cookieService.get(LocalStorage.Token);
  }

  deleteToken(): void {
    this.cookieService.delete(LocalStorage.Token);
  }

  isTokenExpired(token: string): boolean {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp ? decodedToken.exp * 1000 < Date.now() : true;
  }
}
