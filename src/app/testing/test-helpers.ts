import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

export function testControlValidity(control: FormControl, value: any, expectedValue: boolean, expectedErrors?: any): void {
  control.setValue(value);
  expect(control.valid).toBe(expectedValue);

  if (expectedErrors) {
    expect(control.errors).toEqual(expectedErrors);
  }
}

export function testEmailControl(control: FormControl): void {
  testControlValidity(control, '', false);
  testControlValidity(control, '.', false);
  testControlValidity(control, 'test<:*@gmail.com', false);
  testControlValidity(control, 'test@', false);
  testControlValidity(control, 'test@gmail.', false);
  testControlValidity(control, 'test@gmail.com', true);
  testControlValidity(control, 'test.email@gmail.com', true);
  testControlValidity(control, 'test@gmail.sub.com', true);
}

export function testUsernameControl(control: FormControl): void {
  testControlValidity(control, '', false, { required: true });
  testControlValidity(control, ' ', false, { username: true });
  testControlValidity(control, 'invalid username', false, { username: true });
  testControlValidity(control, 'invalid@username', false, { username: true });
  testControlValidity(control, 'invalid*username', false, { username: true });
  testControlValidity(control, 'invalid%username', false, { username: true });
  testControlValidity(control, 'valid_username', true);
  testControlValidity(control, 'user.name', true);
  testControlValidity(control, 'user-name', true);
  testControlValidity(control, 'user_name', true);
  testControlValidity(control, 'user123', true);
}

export function testPasswordControl(control: FormControl): void {
  testControlValidity(control, '', false, {
    required: true,
    password: { minlength: true, uppercase: true, number: true }
  });
  testControlValidity(control, 'short', false, {
    password: {
      minlength: true,
      uppercase: true,
      number: true
    }
  });
  testControlValidity(control, 'longenough', false, { password: { uppercase: true, number: true } });
  testControlValidity(control, 'nouppercase1', false, { password: { uppercase: true } });
  testControlValidity(control, 'Nonumber', false, { password: { number: true } });
  testControlValidity(control, '12345678', false, { password: { uppercase: true } });

  testControlValidity(control, 'Valid123', true);
  testControlValidity(control, 'PASSWORD1!', true);
}

export const mockDynamicDialogRef = {
  close: jest.fn(),
  destroy: jest.fn(),
  dragStart: jest.fn(),
  dragEnd: jest.fn(),
  resizeInit: jest.fn(),
  resizeEnd: jest.fn(),
  maximize: jest.fn(),

  onClose: new Subject<any>(),
  onDestroy: new Subject<any>(),
  onDragStart: new Subject<any>(),
  onDragEnd: new Subject<any>(),
  onResizeInit: new Subject<any>(),
  onResizeEnd: new Subject<any>(),
  onMaximize: new Subject<any>(),

  onChildComponentLoaded: new Subject<any>()
};
