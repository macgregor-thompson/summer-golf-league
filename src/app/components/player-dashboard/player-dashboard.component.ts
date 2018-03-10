import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MockDataService } from '../../services/mock-data.service';
import { MatDialog } from '@angular/material';


import { Golfer } from '../../models/golfer';
import { LeagueStatus } from '../../models/enums/league-status.enum';
import { Team } from '../../models/team';
import { Round } from '../../models/round';
import { HandicapDialogModalComponent } from '../handicap-dialog-modal/handicap-dialog-modal.component';


@Component({
  selector: 'app-player-dashboard',
  templateUrl: './player-dashboard.component.html',
  styleUrls: ['./player-dashboard.component.scss']
})
export class PlayerDashboardComponent implements OnInit {
  displayedColumns: ['name', 'team', 'handicap', 'update'];
  golfers: MatTableDataSource<Golfer>;

  animal: string;
  name: string;

  constructor(private mockDataService: MockDataService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.mockDataService.getGolfers()
      .subscribe((data: Golfer[]) => {
        console.log('golfers:', data);
        this.golfers = new MatTableDataSource(data);
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(HandicapDialogModalComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
