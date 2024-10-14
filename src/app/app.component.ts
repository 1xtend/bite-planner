import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layout/header/header.component';
import { ThemeService } from './core/services/theme.service';
import { LocalStorage } from './shared/models/enums/local-storage.enum';
import { Theme } from './shared/models/types/theme.type';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenubarModule } from 'primeng/menubar';
import { ThemeSwitchComponent } from './shared/components/theme-switch/theme-switch.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CardModule, ButtonModule, DropdownModule, CheckboxModule, InputTextModule, InputTextareaModule, FormsModule, InputSwitchModule, MenubarModule, ThemeSwitchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);

  options = [{ label: 'test' }, { label: 'test -2' }];
  text = 'long text, super loooong text';

  ngOnInit(): void {
    this.setSavedTheme();
  }

  private setSavedTheme(): void {
    const theme = localStorage.getItem(LocalStorage.Theme) as Theme | null;
    this.themeService.setTheme(theme || 'light');
  }
}
