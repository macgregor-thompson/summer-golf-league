import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../models/interfaces/team';

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
