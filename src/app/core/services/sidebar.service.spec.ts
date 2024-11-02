import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SidebarService } from './sidebar.service';
import { take } from 'rxjs';

describe('SidebarService', () => {
  let service: SidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set visible$ to true when show is called', (done) => {
    service.show();

    service.visible$.pipe(take(1)).subscribe((value) => {
      expect(value).toBeTruthy();
      done();
    });
  });

  it('should set visible$ to false and emit event in 300 milliseconds when hide is called ', fakeAsync(() => {
    service.hide().pipe(take(1)).subscribe();

    tick(300);

    service.visible$.pipe(take(1)).subscribe((value) => {
      expect(value).toBeFalsy();
    });
  }));
});
