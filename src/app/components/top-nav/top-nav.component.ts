import { Component, OnInit } from '@angular/core';
import { Nav } from '../../models/nav';


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  routes: Nav[] = [
    {
      path: '/',
      name: 'Home',
      exact: true
    },
    {
      path: '/rankings',
      name: 'Rankings',
      exact: true
    },
    {
      path: '/players',
      name: 'Players',
      exact: true
    },
    {
      path: '/scores',
      name: 'Scores',
      exact: true
    },
    {
      path: '/rules',
      name: 'Rules',
      exact: true
    }
  ];


  constructor() { }

  ngOnInit() {
  }

}
