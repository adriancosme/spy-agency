import { Hit } from '../../../src/Contexts/Hits/domain/Hit';
import { HitsResponse } from '../../../src/Contexts/Hits/application/HitsResponse';

export class SearchAllHitsResponseMother {
  static create(hits: Array<Hit>): HitsResponse {
    return new HitsResponse(hits);
  }
}
