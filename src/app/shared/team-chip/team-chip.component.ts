import { Component, OnInit, Input } from '@angular/core';
import { Golfer } from '../../models/golfer';

@Component({
  selector: 'app-team-chip',
  templateUrl: './team-chip.component.html',
  styleUrls: ['./team-chip.component.scss']
})
export class TeamChipComponent implements OnInit {
  @Input() golfer: Golfer;



  constructor() { }

  ngOnInit() {
  }

}
