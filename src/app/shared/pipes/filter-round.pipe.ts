import { Pipe, PipeTransform } from '@angular/core';
import { Round } from '../../models/round';

@Pipe({
  name: 'filterRound'
})
export class FilterRoundPipe implements PipeTransform {

  transform(rounds: Round[], args?: number): Round | Round[] {
    if (!rounds) { return rounds; }
    // this is filtering the array, but is still returning an array
    return rounds.filter((round: Round) => round.golferId === args)[0];
  }

}
