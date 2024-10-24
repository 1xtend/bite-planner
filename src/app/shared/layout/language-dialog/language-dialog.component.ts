import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AVAILABLE_LANGUAGES } from '../../helpers/available-languages';
import { ButtonDirective } from 'primeng/button';
import { DialogManagerService } from '../../../core/services/dialog-manager.service';
import { LocaleService } from '../../../core/services/locale.service';
import { Language } from '../../models/types/language.type';
import { TranslateModule } from '@ngx-translate/core';
import { languageLabels } from '../../helpers/language-labels';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

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

  currentLanguage = toSignal(this.localeService.language$);

  selectLanguage(language: Language): void {
    if (this.currentLanguage() !== language) {
      this.localeService.setLanguage(language);
    }

    this.dialogManager.closeDialog();
  }
}
