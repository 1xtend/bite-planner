import { Injectable } from '@angular/core';
import { Breakpoint } from '../../shared/models/types/breakpoint.type';
import { distinctUntilChanged, filter, fromEvent, map, Observable, startWith } from 'rxjs';

interface Breakpoints {
  key: Breakpoint,
  value: number
}

@Injectable({
  providedIn: 'root'
})
export class BreakpointObserver {
  private readonly breakpoints: { [K in Breakpoint]: number } = {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  };
  private readonly breakpointsArray: Breakpoints[] = [
    { key: 'xl', value: this.breakpoints.xl },
    { key: 'lg', value: this.breakpoints.lg },
    { key: 'md', value: this.breakpoints.md },
    { key: 'sm', value: this.breakpoints.sm }
  ];

  observe(breakpoints?: Breakpoint | Breakpoint[]): Observable<Breakpoint> {
    return fromEvent(window, 'resize').pipe(
      startWith(window.innerWidth),
      map(() => window.innerWidth),
      map((width) => this.getBreakpoint(width)),
      distinctUntilChanged(),
      filter((breakpoint) => breakpoints ? breakpoints.includes(breakpoint) : true)
    );
  }

  getBreakpoints(): { [K in Breakpoint]: number } {
    return this.breakpoints;
  }

  private getBreakpoint(width: number): Breakpoint {
    const matchedBreakpoint = this.breakpointsArray.find((breakpoint) => width >= breakpoint.value);
    return matchedBreakpoint ? matchedBreakpoint.key : 'sm';
  }
}
