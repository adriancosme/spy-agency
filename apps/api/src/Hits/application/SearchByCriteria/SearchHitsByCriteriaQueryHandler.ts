import { HitsResponse } from '../HitsResponse';
import { Filters } from '../../../Shared/domain/criteria/Filters';
import { Order } from '../../../Shared/domain/criteria/Order';
import { Query } from '../../../Shared/domain/Query';
import { SearchHitsByCriteriaQuery } from './SearchHitsByCriteriaQuery';
import { QueryHandler } from '../../../Shared/domain/QueryHandler';
import { HitsByCriteriaSearcher } from './HitsByCriteriaSearcher';

export class SearchHitsByCriteriaQueryHandler
  implements QueryHandler<SearchHitsByCriteriaQuery, HitsResponse>
{
  constructor(private searcher: HitsByCriteriaSearcher) {}

  subscribedTo(): Query {
    return SearchHitsByCriteriaQuery;
  }

  handle(query: SearchHitsByCriteriaQuery): Promise<HitsResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);

    return this.searcher.run(filters, order, query.limit, query.offset);
  }
}
