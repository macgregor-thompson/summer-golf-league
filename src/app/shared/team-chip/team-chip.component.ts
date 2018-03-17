import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../models/team';

@Component({
  selector: 'app-team-chip',
  templateUrl: './team-chip.component.html',
  styleUrls: ['./team-chip.component.scss']
})
export class TeamChipComponent implements OnInit {
  @Input() team: Team;

  constructor() { }

  ngOnInit() {
  }

}
