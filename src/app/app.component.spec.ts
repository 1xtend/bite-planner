import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ThemeService } from './core/services/theme.service';
import { mockLocaleService, mockThemeService } from './testing/mock-services';
import { LocaleService } from './core/services/locale.service';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: ThemeService, useValue: mockThemeService },
        { provide: LocaleService, useValue: mockLocaleService }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('when ngOnInit is called', () => {
    it('should set saved theme', () => {
      mockThemeService.getSavedTheme.mockReturnValue('dark');
      component.ngOnInit();
      expect(mockThemeService.setTheme).toHaveBeenCalledWith('dark');
    });

    it('should set saved locale', () => {
      mockLocaleService.getSavedLanguage.mockReturnValue('en');
      component.ngOnInit();
      expect(mockLocaleService.setLanguage).toHaveBeenCalledWith('en');
    });
  });
});
