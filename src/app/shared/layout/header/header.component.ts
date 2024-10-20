import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { IconButtonComponent } from '../../components/icon-button/icon-button.component';
import { ThemeSwitchComponent } from '../../components/theme-switch/theme-switch.component';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LogoComponent,
    ButtonModule,
    TranslateModule,
    IconButtonComponent,
    ThemeSwitchComponent,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private router = inject(Router);

  private basicHeaderRoutes: string[] = ['/login', '/signup'];

  basicHeader$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event: any) => this.basicHeaderRoutes.includes(event.url)),
    distinctUntilChanged()
  );
}
