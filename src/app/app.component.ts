import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
   <div class="summer-league-app">
     <app-top-nav></app-top-nav>
     <div class="container">
       <router-outlet></router-outlet>
     </div>
   </div>
  `,
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
}
