import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordInputComponent } from './password-input.component';

describe('PasswordInputComponent', () => {
  let component: PasswordInputComponent;
  let fixture: ComponentFixture<PasswordInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordInputComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PasswordInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write value', () => {
    component.writeValue('test');
    expect(component.value()).toBe('test');
  });

  it('should set disabled state', () => {
    component.setDisabledState(true);
    expect(component.disabled()).toBeTruthy();

    component.setDisabledState(false);
    expect(component.disabled()).toBeFalsy();
  });

  it('should set registerOnChange function', () => {
    const onChangeFn = jest.fn();
    component.registerOnChange(onChangeFn);

    component.onChange('test');
    expect(onChangeFn).toHaveBeenCalledWith('test');
  });

  it('should set registerOnTouched function', () => {
    const onTouchedFn = jest.fn();
    component.registerOnTouched(onTouchedFn);

    component.onTouched();
    expect(onTouchedFn).toHaveBeenCalled();
  });
});
