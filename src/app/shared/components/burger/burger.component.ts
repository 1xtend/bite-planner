import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'app-burger',
  standalone: true,
  imports: [
    Button
  ],
  templateUrl: './burger.component.html',
  styleUrl: './burger.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BurgerComponent {
  private sidebarService = inject(SidebarService);

  showSidebar(): void {
    this.sidebarService.show();
  }
}
