import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorage } from '../../shared/models/enums/local-storage.enum';
import { AVAILABLE_LANGUAGES } from '../../shared/helpers/available-languages';
import { Language } from '../../shared/models/types/language.type';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  private translateService = inject(TranslateService);

  private languageSubject = new BehaviorSubject<Language>(this.getSavedLanguage());
  language$ = this.languageSubject.asObservable();

  setLanguage(language: Language): void {
    if (!this.isAvailableLanguage(language)) {
      return;
    }

    this.translateService.use(language);
    this.languageSubject.next(language);
    localStorage.setItem(LocalStorage.Language, language);
  }

  getSavedLanguage(): Language {
    const language = localStorage.getItem(LocalStorage.Language) as Language | null;

    if (!language || !this.isAvailableLanguage(language)) {
      return 'en';
    }

    return language;
  }

  private isAvailableLanguage(language: Language): boolean {
    return AVAILABLE_LANGUAGES.includes(language);
  }
}
