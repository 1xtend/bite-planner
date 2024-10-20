import { TestBed } from '@angular/core/testing';

import { LocaleService } from './locale.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalStorage } from '../../shared/models/enums/local-storage.enum';
import { Language } from '../../shared/models/types/language.type';
import { take } from 'rxjs';

describe('LocaleService', () => {
  let service: LocaleService;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [TranslateService]
    });
    service = TestBed.inject(LocaleService);
    translateService = TestBed.inject(TranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when getSavedLanguage is called', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should return "en" if there is no saved language', () => {
      expect(service.getSavedLanguage()).toBe('en');
    });

    it('should return "en" if provided language is not valid', () => {
      localStorage.setItem(LocalStorage.Language, 'test');
      expect(service.getSavedLanguage()).toBe('en');
    });

    it('should return saved language', () => {
      localStorage.setItem(LocalStorage.Language, 'en');
      expect(service.getSavedLanguage()).toBe('en');
    });
  });

  describe('when setLanguage is called', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should not save invalid language', () => {
      service.setLanguage('test' as Language);
      expect(localStorage.getItem(LocalStorage.Language)).not.toBe('test');
    });

    it('should save provided language', () => {
      const useSpy = jest.spyOn(translateService, 'use');

      service.setLanguage('ua');

      expect(localStorage.getItem(LocalStorage.Language)).toBe('ua');
      expect(useSpy).toHaveBeenCalledWith('ua');
      service.language$.pipe(take(1)).subscribe((value) => {
        expect(value).toBe('ua');
      });
    });
  });
});
