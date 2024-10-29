import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { map, Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { BurgerComponent } from '../../components/burger/burger.component';
import { BreakpointObserver } from '../../../core/services/breakpoint-observer.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LogoComponent,
    ButtonModule,
    TranslateModule,
    AsyncPipe,
    RouterLink,
    BurgerComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private breakpointObserver = inject(BreakpointObserver);

  authenticated$: Observable<boolean> = this.authService.authenticated$;
  showNavigation$: Observable<boolean> = this.breakpointObserver.observe().pipe(
    map((breakpoint) => breakpoint !== 'sm')
  );
}
