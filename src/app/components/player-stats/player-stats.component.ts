import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { MockDataService } from '../../services/mock-data.service';
import { Golfer } from '../../models/golfer';
import { Round } from '../../models/round';
import { Score } from '../../models/score';


@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent implements OnInit {
  @Input() player: Golfer;
  @Output() passUpAverage: EventEmitter<number> = new EventEmitter<number>();

  rounds: Round[];
  spinner = false;
  scores: object[];
  birdies = 0;
  pars = 0;
  bogies = 0;
  doubles = 0;
  eagles = 0;
  others = 0;
  colorScheme = {
    domain: [
      '#f44336', // birdies
      '#43a047', // pars
      '#333333', // bogies
      '#923eaa', // doubles
      '#009baa', // eagles
      '#c77f40' // others
    ]
  };


  constructor(private mockDataService: MockDataService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getScores();
  }

  getScores() {
    this.spinner = true;
    this.mockDataService.getPlayerScores(this.player.id)
      .subscribe((data: Round[]) => {
        this.rounds = data;
        this.analyzeScores();
        this.calculateAverage();
        this.spinner = false;
      }, () => this.spinner = false);
  }

  analyzeScores() {
    this.spinner = true;
    this.rounds.forEach((round: Round) => {
      round.scores.map((score: Score) => {
        if (score.score === score.par) {
          this.pars++;
        } else if (score.score === score.par + 1) {
          this.bogies++;
        } else if (score.score === score.par + 2) {
          this.doubles++;
        } else if (score.score === score.par - 1) {
          this.birdies++;
        } else if (score.score === score.par - 2) {
          this.eagles++;
        } else {
          this.others++;
        }
      });
    });
    this.scores = [
      { name: 'Birdies', value: this.birdies },
      { name: 'Pars', value: this.pars },
      { name: 'Bogies', value: this.bogies },
      { name: 'Doubles', value: this.doubles },
      { name: 'Eagles', value: this.eagles },
      { name: 'Others', value: this.others }
    ];
    this.spinner = false;
  }

  calculateAverage() {
    let totals = 0;
    this.rounds.forEach((round: Round) => {
      totals = totals + round.total;
    });
    this.passUpAverage.emit(totals / this.rounds.length);
  }

  onSelect(event) {
    console.log('event:', event);
    switch (event.name) {
      case 'Doubles':
        if (this.doubles > this.bogies) {
          this.openSnackBar('You have more doubles than bogies! You suck!!!', 'YOU SUCK!!!');
        }
        break;
      case 'Others':
        if (this.others > this.pars) {
          this.openSnackBar('You have more others than pars...You should just give up golf!', 'YOU SUCK!!!');
        }
        break;
      case 'Birdies':
        if (this.rounds.length > this.birdies) {
          this.openSnackBar('You have more rounds than birdies...', 'HAHA!');
        }
        break;
      case 'Pars':
        if (this.pars > this.birdies) {
          this.openSnackBar('Will you make some birdies for once???', 'YA BITCH!!!');
        }
        break;
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
