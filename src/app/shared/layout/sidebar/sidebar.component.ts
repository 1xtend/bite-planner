import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { SidebarService } from '../../../core/services/sidebar.service';
import { AsyncPipe } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../core/services/theme.service';
import { DialogManagerService } from '../../../core/services/dialog-manager.service';
import { LanguageDialogComponent } from '../language-dialog/language-dialog.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { Theme } from '../../models/types/theme.type';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { BreakpointObserver } from '../../../core/services/breakpoint-observer.service';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SidebarModule,
    AsyncPipe,
    TranslateModule,
    InputSwitchModule,
    FormsModule,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  private sidebarService = inject(SidebarService);
  private themeService = inject(ThemeService);
  private dialogManager = inject(DialogManagerService);
  private translateService = inject(TranslateService);
  private authService = inject(AuthService);
  private breakpointObserver = inject(BreakpointObserver);

  private currentTheme = toSignal(this.themeService.theme$);
  activeDarkTheme: boolean = this.currentTheme() === 'dark';

  visible$ = this.sidebarService.visible$;
  authenticated$: Observable<boolean> = this.authService.authenticated$;
  showAuth$: Observable<boolean> = this.breakpointObserver.observe().pipe(
    map((breakpoint) => breakpoint === 'sm')
  );

  hide(): void {
    this.sidebarService.hide();
  }

  changeLanguage(): void {
    this.sidebarService.hide().subscribe(() => {
      const header = this.translateService.instant('locale.select-language');
      this.dialogManager.openDialog(LanguageDialogComponent, { header });
    });
  }

  switchTheme(): void {
    const theme: Theme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.themeService.setTheme(theme);
  }

  signout(): void {
    this.authService.signout().subscribe(() => {
      this.hide();
    });
  }
}
