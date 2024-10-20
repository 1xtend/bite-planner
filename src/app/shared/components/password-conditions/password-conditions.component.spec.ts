import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordConditionsComponent } from './password-conditions.component';
import { FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('PasswordConditionsComponent', () => {
  let component: PasswordConditionsComponent;
  let fixture: ComponentFixture<PasswordConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordConditionsComponent, TranslateModule.forRoot()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PasswordConditionsComponent);
    component = fixture.componentInstance;

    const control = new FormControl('');
    fixture.componentRef.setInput('control', control);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
