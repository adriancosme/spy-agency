import { Hit } from '../../../src/Hits/domain/Hit';
import { HitsResponse } from '../../../src/Hits/application/HitsResponse';

export class SearchAllHitsResponseMother {
  static create(hits: Array<Hit>): HitsResponse {
    return new HitsResponse(hits);
  }
}
