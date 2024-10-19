import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordConditionsComponent } from './password-conditions.component';

describe('PasswordConditionsComponent', () => {
  let component: PasswordConditionsComponent;
  let fixture: ComponentFixture<PasswordConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordConditionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
