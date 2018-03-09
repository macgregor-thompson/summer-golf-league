import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Round } from '../../models/round';
import { SidePlayed } from '../../models/enums/side-played.enum';
import { MockDataService } from '../../services/mock-data.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  round: Round;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private mockDataService: MockDataService) { }

  ngOnInit() {
    this.route.params
      .switchMap((round: Round) => this.mockDataService.getScore(round.id))
      .subscribe(data => {
        console.log('data:', typeof data, data);
      });
  }
}
