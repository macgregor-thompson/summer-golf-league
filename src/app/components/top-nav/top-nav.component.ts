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
      exact: true,
      icon: 'home'
    },
    {
      path: '/rankings',
      name: 'Rankings',
      exact: true,
      icon: 'format_list_numbered'
    },
    {
      path: '/scores',
      name: 'Scores',
      exact: true,
      icon: 'golf_course'
    },
    {
      path: '/players',
      name: 'Players',
      exact: true,
      icon: 'people'
    },
    {
      path: '/rules',
      name: 'Rules',
      exact: true,
      icon: 'priority_high'
    }
  ];


  constructor() { }

  ngOnInit() {
  }

}
