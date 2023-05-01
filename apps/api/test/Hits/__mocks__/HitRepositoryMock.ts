import { Hit } from 'src/Contexts/Hits/domain/Hit';
import { HitRepository } from '../../../src/Contexts/Hits/domain/HitRepository';
import { Criteria } from 'src/Contexts/Shared/domain/criteria/Criteria';

export class HitRepositoryMock implements HitRepository {
  private saveMock = jest.fn();
  private searchAllMock = jest.fn();
  private searchByIdMock = jest.fn();
  private deleteMock = jest.fn();
  private updateMock = jest.fn();
  private matchingMock = jest.fn();
  private hit: Hit;
  private hits: Hit[];

  returnSearchAll(hits: Hit[]): void {
    this.hits = hits;
  }

  returnSeachById(hit: Hit): void {
    this.hit = hit;
  }

  returnMatching(hits: Hit[]): void {
    this.hits = hits;
  }

  async save(hit: Hit): Promise<void> {
    this.saveMock(hit);
  }

  assertSaveHasBeenCalledWith(hit: Hit) {
    expect(this.saveMock).toHaveBeenCalledWith(hit);
  }

  async searchAll(): Promise<Hit[]> {
    this.searchAllMock();
    return this.hits;
  }

  assertSearchAll() {
    expect(this.searchAllMock).toHaveBeenCalled();
  }

  async searchById(id: string): Promise<Hit> {
    this.searchByIdMock(id);
    return this.hit;
  }

  assertSearchByIdHasBeenCalledWith(id: string) {
    expect(this.searchByIdMock).toHaveBeenCalledWith(id);
  }

  async update(hit: Hit): Promise<void> {
    this.updateMock(hit);
  }

  assertUpdateHasBeenCalledWith(hit: Hit) {
    expect(this.updateMock).toHaveBeenCalledWith(hit);
  }

  async delete(id: string): Promise<void> {
    this.deleteMock(id);
  }

  assertDeleteHasBeenCalledWith(id: string) {
    expect(this.deleteMock).toHaveBeenCalledWith(id);
  }

  async matching(criteria: Criteria): Promise<Hit[]> {
    this.matchingMock(criteria);
    return this.hits;
  }

  assertMatchingHasBeenCalledWith() {
    expect(this.matchingMock).toHaveBeenCalled();
  }
}
