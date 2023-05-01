import { HitMother } from '../../../../test/Hits/domain/HitMother';
import { HitRepositoryMock } from '../../../../test/Hits/__mocks__/HitRepositoryMock';
import { SearchAllHitsQueryHandler } from '../../../../src/Contexts/Hits/application/SearchAll/SearchAllHitsQueryHandler';
import { HitsFinder } from '../../../../src/Contexts/Hits/application/SearchAll/HitsFinder';
import { SearchAllHitsQuery } from '../../../../src/Contexts/Hits/application/SearchAll/SearchAllHitsQuery';
import { SearchAllHitsResponseMother } from '../../../../test/Hits/domain/SearchAllHitsResponseMother';

describe('SearchAllHits QueryHandler', () => {
  let repository: HitRepositoryMock;
  beforeEach(() => {
    repository = new HitRepositoryMock();
  });
  it('should find an existing hits', async () => {
    const hits = [HitMother.random(), HitMother.random(), HitMother.random()];
    repository.returnSearchAll(hits);

    const handler = new SearchAllHitsQueryHandler(new HitsFinder(repository));

    const query = new SearchAllHitsQuery();
    const response = await handler.handle(query);

    repository.assertSearchAll();
    const expected = SearchAllHitsResponseMother.create(hits);
    expect(expected).toEqual(response);
  });
});
