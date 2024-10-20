import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { mockActivatedRoute } from '../../testing/mock-services';
import { testControlValidity, testEmailControl } from '../../testing/test-helpers';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, TranslateModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loginForm', () => {
    it('should be initialized with empty fields', () => {
      expect(component.loginForm.getRawValue()).toEqual({ email: '', password: '' });
      expect(component.loginForm.valid).toBeFalsy();
    });

    it('should mark all controls as touched when submitted invalid form', () => {
      const markAllAsTouchedSpy = jest.spyOn(component.loginForm, 'markAllAsTouched');
      component.onSubmit();

      expect(markAllAsTouchedSpy).toHaveBeenCalled();
      expect(component.loginForm.valid).toBeFalsy();
    });

    it('should submit the form when it is valid', () => {
      component.loginForm.setValue({
        email: 'test@gmail.com',
        password: 'Pass1234'
      });
      component.onSubmit();

      expect(component.loginForm.valid).toBeTruthy();
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
});
