import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeSwitchComponent } from './theme-switch.component';
import { ThemeService } from '../../../core/services/theme.service';
import { mockThemeService } from '../../../testing/mock-services';
import { TranslateModule } from '@ngx-translate/core';

describe('ThemeSwitchComponent', () => {
  let component: ThemeSwitchComponent;
  let fixture: ComponentFixture<ThemeSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSwitchComponent, TranslateModule.forRoot()],
      providers: [
        { provide: ThemeService, useValue: mockThemeService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ThemeSwitchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when toggle is called', () => {
    it('should set dark theme if current theme is light', () => {
      mockThemeService.theme$.next('light');
      component.toggle();
      expect(mockThemeService.setTheme).toHaveBeenCalledWith('dark');
    });

    it('should set light theme if current theme is dark', () => {
      mockThemeService.theme$.next('dark');
      component.toggle();
      expect(mockThemeService.setTheme).toHaveBeenCalledWith('light');
    });
  });

  describe('icon computed signal', () => {
    it('should have "pi pi-moon" value when currentTheme is "light"', () => {
      mockThemeService.theme$.next('light');
      expect(component.icon()).toBe('pi pi-moon');
    });

    it('should have "pi pi-sun" value when currentTheme is "dark"', () => {
      mockThemeService.theme$.next('dark');
      expect(component.icon()).toBe('pi pi-sun');
    });
  });

  describe('tooltip computed signal', () => {
    it('should have "tooltip.switch-dark-theme" value when currentTheme is "light"', () => {
      mockThemeService.theme$.next('light');
      expect(component.tooltip()).toBe('tooltip.switch-dark-theme');
    });

    it('should have "tooltip.switch-light-theme" value when currentTheme is "dark"', () => {
      mockThemeService.theme$.next('dark');
      expect(component.tooltip()).toBe('tooltip.switch-light-theme');
    });
  });
});
