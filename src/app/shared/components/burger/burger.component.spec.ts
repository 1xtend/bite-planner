import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerComponent } from './burger.component';
import { SidebarService } from '../../../core/services/sidebar.service';
import { mockSidebarService } from '../../../testing/mock-services';

describe('BurgerComponent', () => {
  let component: BurgerComponent;
  let fixture: ComponentFixture<BurgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BurgerComponent],
      providers: [
        { provide: SidebarService, useValue: mockSidebarService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BurgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show sidebar when showSidebar is called', () => {
    component.showSidebar();
    expect(mockSidebarService.show).toHaveBeenCalled();
  });
});
