import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageDialogComponent } from './language-dialog.component';
import { DialogManagerService } from '../../../core/services/dialog-manager.service';
import { mockDialogManager, mockLocaleService } from '../../../testing/mock-services';
import { LocaleService } from '../../../core/services/locale.service';
import { AVAILABLE_LANGUAGES } from '../../helpers/available-languages';
import { languageLabels } from '../../helpers/language-labels';
import { take } from 'rxjs';

describe('LanguageDialogComponent', () => {
  let component: LanguageDialogComponent;
  let fixture: ComponentFixture<LanguageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageDialogComponent],
      providers: [
        { provide: DialogManagerService, useValue: mockDialogManager },
        { provide: LocaleService, useValue: mockLocaleService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LanguageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct readonly variables', () => {
    mockLocaleService.language$.next('ua');

    expect(component.languagesArray).toEqual(AVAILABLE_LANGUAGES);
    expect(component.labels).toEqual(languageLabels);
    component.currentLanguage$.pipe(take(1)).subscribe((value) => {
      expect(value).toBe('ua');
    });
  });

  it('should select language', () => {
    component.selectLanguage('ua');
    expect(mockLocaleService.setLanguage).toHaveBeenCalledWith('ua');
    expect(mockDialogManager.closeDialog).toHaveBeenCalled();
  });
});
