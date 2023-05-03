import { HitRepository, Hit } from '../../../../src/Contexts/Hits/domain';
import { Criteria } from 'src/Contexts/Shared/domain/criteria/Criteria';

export class HitRepositoryMock implements HitRepository {
  private saveMock = jest.fn();
  private searchAllMock = jest.fn();
  private searchByIdMock = jest.fn();
  private deleteMock = jest.fn();
  private updateMock = jest.fn();
  private matchingMock = jest.fn();
  private searchByAssignedToMock = jest.fn();
  private searchByAssignedToGroupMock = jest.fn();
  private hit: Hit;
  private hits: Hit[];

  returnSearchAll(hits: Hit[]): void {
    this.hits = hits;
  }

  returnSearchById(hit: Hit): void {
    this.hit = hit;
  }

  returnMatching(hits: Hit[]): void {
    this.hits = hits;
  }

  async searchByAssignedTo(assignedTo: number): Promise<Hit[]> {
    await this.searchByAssignedToMock(assignedTo);
    return this.hits;
  }
  async searchByAssignedToGroup(assignedTo: number[]): Promise<Hit[]> {
    await this.searchByAssignedToGroupMock(assignedTo);
    return this.hits;
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
