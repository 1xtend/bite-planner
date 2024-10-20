import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { DialogManagerService } from '../../../core/services/dialog-manager.service';
import { LanguageDialogComponent } from '../../layout/language-dialog/language-dialog.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-language-switch',
  standalone: true,
  imports: [
    IconButtonComponent,
    TooltipModule,
    TranslateModule
  ],
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSwitchComponent {
  private dialogManager = inject(DialogManagerService);
  private translateService = inject(TranslateService);

  openDialog(): void {
    const header = this.translateService.instant('locale.select-language');
    this.dialogManager.openDialog(LanguageDialogComponent, { header });
  }
}
