import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private visibleSubject = new BehaviorSubject<boolean>(false);
  private timer$ = timer(300).pipe(map(() => void 0));

  visible$ = this.visibleSubject.asObservable();

  show(): void {
    this.visibleSubject.next(true);
  }

  hide(): Observable<void> {
    this.visibleSubject.next(false);
    return this.timer$.pipe(take(1));
  }
}
