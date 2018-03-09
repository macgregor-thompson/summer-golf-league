import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../../routes/routes';


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  routes = ROUTES;

  constructor() { }

  ngOnInit() {
  }

}
