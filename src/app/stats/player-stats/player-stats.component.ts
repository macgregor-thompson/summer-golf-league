import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Golfer } from '../../models/golfer';
import { Round } from '../../models/round';
import { Score } from '../../models/score';
import { ChartTypes } from '../../models/enums/chart-types.enum';


@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent implements OnInit {
  @Input() player: Golfer;
  @Input() rounds: Round[];
  //@Output() passUpAverage: EventEmitter<number> = new EventEmitter<number>();

  spinner = false;
  scores: object[];
  showingNetScores: true;
  gross = {
    scores: [],
    birdies: 0,
    pars: 0,
    bogies: 0,
    doubles: 0,
    eagles: 0,
    others: 0
  };
  net = {
    scores: [],
    birdies: 0,
    pars: 0,
    bogies: 0,
    doubles: 0,
    eagles: 0,
    others: 0
  };
  ChartTypes = ChartTypes;
  chartType = ChartTypes.Pie;
  view = [700, 400];
  colorScheme = {
    domain: [
      '#f44336', // birdies
      '#43a047', // pars
      '#333333', // bogies
      '#ffc500', // doubles
      '#3f99fa', // eagles
      '#aa6600' // others
    ]
  };


  constructor(/*private mockDataService: MockDataService,*/
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.analyzeScores();
    //this.getScores();
  }

  /*getScores() {
    this.spinner = true;
    this.mockDataService.getPlayerScores(this.player.id)
      .subscribe((data: Round[]) => {
        this.rounds = data;
        this.analyzeScores();
        this.calculateAverage();
        this.spinner = false;
      }, () => this.spinner = false);
  }*/

  analyzeScores() {
    this.spinner = true;
    this.analyzeGrossScores();
    this.analyzeNetScores();
    this.scores = this.net.scores;

    this.spinner = false;
  }

  analyzeNetScores() {
    this.rounds.forEach((round: Round) => {
      round.scores.map((score: Score) => {
        const netScore = score.handicap <= round.courseHandicap * 2 ? score.score - 1 : score.score;
        if (netScore === score.par) {
          this.net.pars++;
        } else if (netScore === score.par + 1) {
          this.net.bogies++;
        } else if (netScore === score.par + 2) {
          this.net.doubles++;
        } else if (netScore === score.par - 1) {
          this.net.birdies++;
        } else if (netScore === score.par - 2) {
          this.net.eagles++;
        } else {
          this.net.others++;
        }
      });
    });

    this.net.scores = [
      { name: 'Birdies', value: this.net.birdies },
      { name: 'Pars', value: this.net.pars },
      { name: 'Bogies', value: this.net.bogies },
      { name: 'Doubles', value: this.net.doubles },
      { name: 'Eagles', value: this.net.eagles },
      { name: 'Others', value: this.net.others }
    ];
  }


  analyzeGrossScores() {
    this.rounds.forEach((round: Round) => {
      round.scores.map((score: Score) => {
        if (score.score === score.par) {
          this.gross.pars++;
        } else if (score.score === score.par + 1) {
          this.gross.bogies++;
        } else if (score.score === score.par + 2) {
          this.gross.doubles++;
        } else if (score.score === score.par - 1) {
          this.gross.birdies++;
        } else if (score.score === score.par - 2) {
          this.gross.eagles++;
        } else {
          this.gross.others++;
        }
      });
    });

    this.gross.scores = [
      { name: 'Birdies', value: this.gross.birdies },
      { name: 'Pars', value: this.gross.pars },
      { name: 'Bogies', value: this.gross.bogies },
      { name: 'Doubles', value: this.gross.doubles },
      { name: 'Eagles', value: this.gross.eagles },
      { name: 'Others', value: this.gross.others }
    ];
  }

  /* calculateAverage() {
     let totals = 0;
     this.rounds.forEach((round: Round) => {
       totals = totals + round.total;
     });
     this.passUpAverage.emit(totals / this.rounds.length);
   }*/

  onSelect(event) {
    console.log('event:', event);
    if (this.showingNetScores) {
      switch (event.name) {
        case 'Doubles':
          if (this.net.doubles > this.net.bogies) {
            this.openSnackBar('You have more doubles than bogies! You suck!!!', 'YOU SUCK!!!');
          }
          break;
        case 'Others':
          if (this.net.others > this.net.pars) {
            this.openSnackBar('You have more others than pars...You should just give up golf!', 'YOU SUCK!!!');
          }
          break;
        case 'Birdies':
          if (this.rounds.length > this.net.birdies) {
            this.openSnackBar('You have more rounds than birdies...', 'HAHA!');
          }
          break;
        case 'Pars':
          if (this.net.pars > this.net.birdies) {
            this.openSnackBar('Will you make some birdies for once???', 'YA BITCH!!!');
          }
          break;
      }
    } else {
      switch (event.name) {
        case 'Doubles':
          if (this.gross.doubles > this.gross.bogies) {
            this.openSnackBar('You have more doubles than bogies! You suck!!!', 'YOU SUCK!!!');
          }
          break;
        case 'Others':
          if (this.gross.others > this.gross.pars) {
            this.openSnackBar('You have more others than pars...You should just give up golf!', 'YOU SUCK!!!');
          }
          break;
        case 'Birdies':
          if (this.rounds.length > this.gross.birdies) {
            this.openSnackBar('You have more rounds than birdies...', 'HAHA!');
          }
          break;
        case 'Pars':
          if (this.gross.pars > this.gross.birdies) {
            this.openSnackBar('Will you make some birdies for once???', 'YA BITCH!!!');
          }
          break;
      }
    }

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}



