import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div>
      <h2>
        <mat-icon color="warn">mood_bad</mat-icon>
        <span>Oops...not sure where you were trying to go dummy...</span>
      </h2>
      <button mat-raised-button color="warn" routerLink="/">
        <mat-icon>home</mat-icon>
        <span>Go Home</span>
      </button>
    </div>
  `
})
export class NotFoundComponent {}
