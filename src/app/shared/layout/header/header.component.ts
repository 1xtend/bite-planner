import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { distinctUntilChanged, fromEvent, map, startWith } from 'rxjs';
import { IconButtonComponent } from '../../components/icon-button/icon-button.component';
import { ThemeSwitchComponent } from '../../components/theme-switch/theme-switch.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LogoComponent,
    ButtonModule,
    TranslateModule,
    IconButtonComponent,
    ThemeSwitchComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  visibleNavigation$ = fromEvent(window, 'resize').pipe(
    startWith(() => window.innerWidth > 1024),
    map(() => window.innerWidth > 1024),
    distinctUntilChanged()
  );
}
