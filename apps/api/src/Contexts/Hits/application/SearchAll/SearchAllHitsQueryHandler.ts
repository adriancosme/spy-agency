import { Query } from '../../../Shared/domain/Query';
import { QueryHandler } from '../../../Shared/domain/QueryHandler';
import { HitsResponse } from '../HitsResponse';
import { HitsFinder } from './HitsFinder';
import { SearchAllHitsQuery } from './SearchAllHitsQuery';

export class SearchAllHitsQueryHandler
  implements QueryHandler<SearchAllHitsQuery, HitsResponse>
{
  constructor(private readonly hitsFinder: HitsFinder) {}

  subscribedTo(): Query {
    return SearchAllHitsQuery;
  }

  async handle(_query: SearchAllHitsQuery): Promise<HitsResponse> {
    return new HitsResponse(await this.hitsFinder.run());
  }
}
