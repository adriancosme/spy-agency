import { HitsResponse } from '../../../../src/Contexts/Hits/application/HitsResponse';
import { Hit } from '../../../../src/Contexts/Hits/domain';

export class SearchHitsByCriteriaResponseMother {
  static create(hits: Array<Hit>) {
    return new HitsResponse(hits);
  }
}
