import { Component } from '@angular/core';
import { ROUTES } from './routes/routes';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar>
      <span>Summer Golf League</span>
      <!-- This fills the remaining space of the current row -->
      <span class="example-fill-remaining-space"></span>
      <nav mat-tab-nav-bar>
        <a mat-tab-link
           *ngFor="let link of routes"
           [routerLink]="link.path"
           routerLinkActive #rla="routerLinkActive"
           [active]="rla.isActive"
           [routerLinkActiveOptions]="{ exact: link.exact }">
          {{link.name}}
        </a>
      </nav>
      <!--<a mat-raised-button color="primary" *ngFor="let link of navLinks"
         [routerLink]="link.path"
         routerLinkActive="active"
         [routerLinkActiveOptions]="{ exact: link.exact }">
        {{ link.name }}
      </a>-->
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  routes = ROUTES;
}
