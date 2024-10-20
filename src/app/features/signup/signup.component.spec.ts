import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { mockActivatedRoute } from '../../testing/mock-services';
import {
  testEmailControl,
  testPasswordControl,
  testUsernameControl
} from '../../testing/test-helpers';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent, TranslateModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('signupForm', () => {
    it('should be initialized with empty fields', () => {
      expect(component.signupForm.getRawValue()).toEqual({ username: '', email: '', password: '' });
      expect(component.signupForm.valid).toBeFalsy();
    });

    it('should mark all controls as touched when submitted invalid form', () => {
      const markAllAsTouchedSpy = jest.spyOn(component.signupForm, 'markAllAsTouched');
      component.onSubmit();

      expect(markAllAsTouchedSpy).toHaveBeenCalled();
      expect(component.signupForm.valid).toBeFalsy();
    });

    it('should submit the form when it is valid', () => {
      component.signupForm.setValue({
        username: 'test_user',
        email: 'test@gmail.com',
        password: 'Pass1234'
      });
      component.onSubmit();

      expect(component.signupForm.valid).toBeTruthy();
    });

    it('should validate username control', () => {
      const usernameControl = component.signupForm.controls['username'];
      testUsernameControl(usernameControl);
    });

    it('should validate email control', () => {
      const emailControl = component.signupForm.controls['email'];
      testEmailControl(emailControl);
    });

    it('should validate password control', () => {
      const passwordControl = component.signupForm.controls['password'];
      testPasswordControl(passwordControl);
    });
  });
});
