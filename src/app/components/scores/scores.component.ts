import { Component, OnInit } from '@angular/core';
import { Score } from '../../models/score';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: [ './scores.component.scss' ]
})
export class ScoresComponent implements OnInit {
  scores: Score[];
  step = 0;

  constructor(private mockDataService: MockDataService) { }

  ngOnInit() {
    this.getAllScores();
  }

  getAllScores() {
    this.mockDataService.getAllScores()
      .subscribe((data: Score[]) => this.scores = data);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
