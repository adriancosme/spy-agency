import { Hit } from 'src/Hits/domain/Hit';
import { HitRepository } from '../../../src/Hits/domain/HitRepository';

export class HitRepositoryMock implements HitRepository {
  private saveMock = jest.fn();
  private searchAllMock = jest.fn();
  private searchByIdMock = jest.fn();
  private deleteMock = jest.fn();
  private updateMock = jest.fn();
  private hit: Hit;
  private hits: Hit[];

  async returnSearchAll(hits: Hit[]): Promise<Hit[]> {
    this.hits = hits;
    return this.hits;
  }

  async returnSeachById(hit: Hit): Promise<Hit> {
    this.hit = hit;
    return this.hit;
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

  assertSearchAllHasBeenCalled() {
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
}
