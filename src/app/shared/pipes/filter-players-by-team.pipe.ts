import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../../models/classes/player';

@Pipe({
  name: 'filterPlayersByTeam'
})
export class FilterPlayersByTeamPipe implements PipeTransform {

  transform(players: Player[], id?: number): Player[] {
    return players.filter(player => player.teamId === id);
  }

}
