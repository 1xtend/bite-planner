import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayControlErrorComponent } from './display-control-error.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
