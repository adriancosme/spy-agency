import { Filters } from '../../../Shared/domain/criteria/Filters';
import { HitRepository } from '../../domain';
import { HitsResponse } from '../HitsResponse';
import { Criteria } from '../../../Shared/domain/criteria/Criteria';
import { Order } from '../../../Shared/domain/criteria/Order';

export class HitsByCriteriaSearcher {
  constructor(private repository: HitRepository) {}

  async run(
    filters: Filters,
    order: Order,
    limit?: number,
    offset?: number,
  ): Promise<HitsResponse> {
    const criteria = new Criteria(filters, order, limit, offset);

    const hits = await this.repository.matching(criteria);
    return new HitsResponse(hits);
  }
}
