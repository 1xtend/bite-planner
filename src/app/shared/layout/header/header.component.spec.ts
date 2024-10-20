import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, take } from 'rxjs';
import { mockActivatedRoute } from '../../../testing/mock-services';
import { DialogService } from 'primeng/dynamicdialog';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const mockRouter = {
    events: new Subject()
  };

  function navigateTo(route: string): void {
    mockRouter.events.next(new NavigationEnd(0, `/${ route }`, `/${ route }`));
  }

  function basicHeaderShouldReturn(value: boolean): void {
    component.basicHeader$.pipe(take(1)).subscribe((result) => {
      expect(result).toBe(value);
    });
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, TranslateModule.forRoot()],
      providers: [
        DialogService,
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('basicHeader$', () => {
    it('should be true when route is /login', () => {
      navigateTo('login');
      basicHeaderShouldReturn(true);
    });

    it('should be true when route is /signup', () => {
      navigateTo('signup');
      basicHeaderShouldReturn(true);
    });

    it('should be false when route is /home', () => {
      navigateTo('home');
      basicHeaderShouldReturn(false);
    });
  });
});
