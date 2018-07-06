import { FilterPlayersByTeamPipe } from './filter-players-by-team.pipe';

describe('FilterPlayersByTeamPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPlayersByTeamPipe();
    expect(pipe).toBeTruthy();
  });
});
