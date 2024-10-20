import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AVAILABLE_LANGUAGES } from '../../helpers/available-languages';
import {ButtonDirective } from 'primeng/button';
import { DialogManagerService } from '../../../core/services/dialog-manager.service';
import { LocaleService } from '../../../core/services/locale.service';
import { Language } from '../../models/types/language.type';
import { TranslateModule } from '@ngx-translate/core';
import { languageLabels } from '../../helpers/language-labels';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-language-dialog',
  standalone: true,
  imports: [
    ButtonDirective,
    TranslateModule,
    AsyncPipe
  ],
  templateUrl: './language-dialog.component.html',
  styleUrl: './language-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageDialogComponent {
  private dialogManager = inject(DialogManagerService);
  private localeService = inject(LocaleService);

  readonly languagesArray: Language[] = AVAILABLE_LANGUAGES;
  readonly labels = languageLabels;

  currentLanguage$ = this.localeService.language$;

  selectLanguage(language: Language): void {
    this.localeService.setLanguage(language);
    this.dialogManager.closeDialog();
  }
}
