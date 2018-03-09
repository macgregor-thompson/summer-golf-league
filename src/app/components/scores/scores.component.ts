import { Component, OnInit } from '@angular/core';

import { MockDataService } from '../../services/mock-data.service';
import { Round } from '../../models/round';
import { SidePlayed } from '../../models/enums/side-played.enum';


@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: [ './scores.component.scss' ]
})
export class ScoresComponent implements OnInit {
  rounds: Round[];

  constructor(private mockDataService: MockDataService) { }

  ngOnInit() {
    this.getAllScores();
  }

  getAllScores() {
    return this.mockDataService.getAllScores()
      .subscribe((data: Round[]) => this.rounds = data);
  }
}
