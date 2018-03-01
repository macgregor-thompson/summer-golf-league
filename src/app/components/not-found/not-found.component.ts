import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div>
      These are not the droids you are looking for...
      <a routerLink="/">Go Home</a>
    </div>
  `
})
export class NotFoundComponent {}
