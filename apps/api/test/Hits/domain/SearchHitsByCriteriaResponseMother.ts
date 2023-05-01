import { HitsResponse } from '../../../src/Hits/application/HitsResponse';
import { Hit } from '../../../src/Hits/domain';

export class SearchHitsByCriteriaResponseMother {
  static create(hits: Array<Hit>) {
    return new HitsResponse(hits);
  }
}
