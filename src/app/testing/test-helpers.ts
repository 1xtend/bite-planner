import { FormControl } from '@angular/forms';

export function testControlValidity(control: FormControl, value: any, expectedValue: boolean, expectedErrors?: any): void {
  control.setValue(value);
  expect(control.valid).toBe(expectedValue);

  if (expectedErrors) {
    expect(control.errors).toEqual(expectedErrors);
  }
}
