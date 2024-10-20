import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSwitchComponent } from './language-switch.component';
import { DialogManagerService } from '../../../core/services/dialog-manager.service';
import { mockDialogManager } from '../../../testing/mock-services';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageDialogComponent } from '../../layout/language-dialog/language-dialog.component';

describe('LanguageSwitchComponent', () => {
  let component: LanguageSwitchComponent;
  let fixture: ComponentFixture<LanguageSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSwitchComponent, TranslateModule.forRoot()],
      providers: [
        TranslateService,
        { provide: DialogManagerService, useValue: mockDialogManager }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LanguageSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog', () => {
    component.openDialog();
    expect(mockDialogManager.openDialog).toHaveBeenCalledWith(LanguageDialogComponent, { header: 'locale.select-language' });
  });
});
