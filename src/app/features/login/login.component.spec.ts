import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter, Router } from '@angular/router';
import { mockAuthService } from '../../testing/mock-services';
import { testControlValidity, testEmailControl } from '../../testing/test-helpers';
import { AuthService } from '../../core/services/auth.service';
import { map, switchMap, throwError, timer } from 'rxjs';
import { User } from '@angular/fire/auth';

class MockHomeComponent {
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([{ path: 'home', component: MockHomeComponent }]),
        { provide: AuthService, useValue: mockAuthService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loginForm', () => {
    it('should be initialized with empty fields', () => {
      expect(component.loginForm.getRawValue()).toEqual({ email: '', password: '' });
      expect(component.loginForm.valid).toBeFalsy();
    });

    it('should validate email control', () => {
      const emailControl = component.loginForm.controls['email'];
      testEmailControl(emailControl);
    });

    it('should validate password control', () => {
      const passwordControl = component.loginForm.controls['password'];
      testControlValidity(passwordControl, '', false, { required: true });
    });
  });

  describe('when onSubmit is called', () => {
    it('should mark all controls as touched when submitted invalid form', () => {
      const markAllAsTouchedSpy = jest.spyOn(component.loginForm, 'markAllAsTouched');
      component.onSubmit();

      expect(markAllAsTouchedSpy).toHaveBeenCalled();
      expect(component.loginForm.valid).toBeFalsy();
    });

    it('should login', fakeAsync(() => {
      const value = {
        email: 'test@gmail.com',
        password: 'Password1'
      };
      const navigateSpy = jest.spyOn(router, 'navigate');
      const resetSpy = jest.spyOn(component.loginForm, 'reset');
      mockAuthService.login.mockReturnValue(timer(100).pipe(map(() => (<User>{}))));
      component.loginForm.setValue(value);

      expect(component.loading()).toBeFalsy();

      component.onSubmit();

      expect(component.loading()).toBeTruthy();
      expect(mockAuthService.login).toHaveBeenCalledWith(value, component.loginForm);
      tick(100);

      expect(component.loading()).toBeFalsy();
      expect(resetSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(['/home']);
    }));

    it('should not login', fakeAsync(() => {
      const value = {
        email: 'test@gmail.com',
        password: 'Password1'
      };
      mockAuthService.login.mockReturnValue(timer(100).pipe(switchMap(() => throwError(() => new Error('')))));
      component.loginForm.setValue(value);

      expect(component.loading()).toBeFalsy();

      component.onSubmit();

      expect(component.loading()).toBeTruthy();
      expect(mockAuthService.login).toHaveBeenCalledWith(value, component.loginForm);
      tick(100);

      expect(component.loading()).toBeFalsy();
    }));
  });
});
