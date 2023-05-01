import { OrderTypes } from '../../../../src/Contexts/Shared/domain/criteria/OrderType';
import { HitsByCriteriaSearcher } from '../../../../src/Contexts/Hits/application/SearchByCriteria/HitsByCriteriaSearcher';
import { SearchHitsByCriteriaQuery } from '../../../../src/Contexts/Hits/application/SearchByCriteria/SearchHitsByCriteriaQuery';
import { SearchHitsByCriteriaQueryHandler } from '../../../../src/Contexts/Hits/application/SearchByCriteria/SearchHitsByCriteriaQueryHandler';
import { HitStatus } from '../../../../src/Contexts/Hits/domain';
import { Operator } from '../../../../src/Contexts/Shared/domain/criteria/FilterOperator';
import { HitRepositoryMock } from '../../../../test/Hits/__mocks__/HitRepositoryMock';
import { HitMother } from '../../../../test/Hits/domain/HitMother';
import { SearchHitsByCriteriaResponseMother } from '../../../../test/Hits/domain/SearchHitsByCriteriaResponseMother';

describe('SearchByCriteria QueryHandler', () => {
  let repository: HitRepositoryMock;
  beforeEach(() => {
    repository = new HitRepositoryMock();
  });
  it('should find hits by criteria using filters', async () => {
    const hits = [HitMother.random(), HitMother.random(), HitMother.random()];
    repository.returnMatching(hits);

    const handler = new SearchHitsByCriteriaQueryHandler(
      new HitsByCriteriaSearcher(repository),
    );
    const filterAssignedTo: Map<string, string> = new Map([
      ['field', 'assignedTo'],
      ['operator', Operator.EQUAL],
      ['value', '1'],
    ]);

    const filterStatus: Map<string, string> = new Map([
      ['field', 'status'],
      ['operator', Operator.EQUAL],
      ['value', HitStatus.COMPLETED.value],
    ]);

    const filters: Array<Map<string, string>> = [
      filterAssignedTo,
      filterStatus,
    ];

    const query = new SearchHitsByCriteriaQuery(filters);
    const response = await handler.handle(query);

    const expected = SearchHitsByCriteriaResponseMother.create(hits);
    repository.assertMatchingHasBeenCalledWith();
    expect(expected).toEqual(response);
  });
  it('should filter hits by criteria with order, limit and offset', async () => {
    const hits = [HitMother.random(), HitMother.random(), HitMother.random()];
    repository.returnMatching(hits);

    const handler = new SearchHitsByCriteriaQueryHandler(
      new HitsByCriteriaSearcher(repository),
    );

    const filterAssignedTo: Map<string, string> = new Map([
      ['field', 'assignedTo'],
      ['operator', Operator.EQUAL],
      ['value', '1'],
    ]);

    const filterStatus: Map<string, string> = new Map([
      ['field', 'status'],
      ['operator', Operator.EQUAL],
      ['value', HitStatus.COMPLETED.value],
    ]);

    const filters: Array<Map<string, string>> = new Array<Map<string, string>>(
      filterAssignedTo,
      filterStatus,
    );

    const orderBy = 'id';
    const orderType = OrderTypes.DESC;

    const query = new SearchHitsByCriteriaQuery(
      filters,
      orderBy,
      orderType,
      10,
      1,
    );
    const response = await handler.handle(query);
    const expected = SearchHitsByCriteriaResponseMother.create(hits);
    repository.assertMatchingHasBeenCalledWith();
    expect(expected).toEqual(response);
  });
});
