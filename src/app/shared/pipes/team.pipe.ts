import { Pipe, PipeTransform } from '@angular/core';
import { Team } from '../../models/interfaces/team';

@Pipe({
  name: 'team'
})
export class TeamPipe implements PipeTransform {

  transform(teams: Team[], id?: number): Team[] {
    return teams.filter(team => team.id === id);
  }

}
