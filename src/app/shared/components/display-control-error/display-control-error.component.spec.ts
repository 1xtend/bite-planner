import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayControlErrorComponent } from './display-control-error.component';
import { FormControl } from '@angular/forms';

describe('DisplayControlErrorComponent', () => {
  let component: DisplayControlErrorComponent;
  let fixture: ComponentFixture<DisplayControlErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayControlErrorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DisplayControlErrorComponent);
    component = fixture.componentInstance;

    const control = new FormControl('');
    fixture.componentRef.setInput('control', control);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct errors array', () => {
    expect(component.errors).toEqual(['email', 'username', 'required']);
  });
});
