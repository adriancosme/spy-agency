import {
  Hitman,
  HitmanRepository,
} from '../../../../src/Contexts/Hitmen/domain';

export class HitmanRepositoryMock implements HitmanRepository {
  private saveMock: jest.Mock = jest.fn();
  private searchAllMock: jest.Mock = jest.fn();
  private searchByIdMock: jest.Mock = jest.fn();
  private searchByEmailMock: jest.Mock = jest.fn();
  private updateMock: jest.Mock = jest.fn();
  private searchByManagedByMock: jest.Mock = jest.fn();
  private hitmen: Array<Hitman> = [];
  private hitman: Hitman;
  returnSearchById(hitman: Hitman): void {
    this.hitman = hitman;
  }

  returnSearchByEmail(hitman: Hitman): void {
    this.hitman = hitman;
  }

  returnSearchAll(hitmen: Array<Hitman>): void {
    this.hitmen = hitmen;
  }

  async searchByManagedBy(managerId: number): Promise<Hitman[]> {
    this.searchByManagedByMock(managerId);
    return this.hitmen;
  }

  async save(hitman: Hitman): Promise<void> {
    this.saveMock(hitman);
  }

  assertSaveHaveBeenCalledWith(expected: Hitman): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }

  async searchAll(): Promise<Hitman[]> {
    this.searchAllMock();
    return this.hitmen;
  }

  assertSearchAllHaveBeenCalled(): void {
    expect(this.searchAllMock).toHaveBeenCalled();
  }

  async searchById(id: number): Promise<Hitman> {
    this.searchByIdMock(id);
    return this.hitman;
  }

  assertSearchByIdHaveBeenCalledWith(expected: number): void {
    expect(this.searchByIdMock).toHaveBeenCalledWith(expected);
  }

  async searchByEmail(email: string): Promise<Hitman> {
    this.searchByEmailMock(email);
    return this.hitman;
  }

  assertSearchByEmailHaveBeenCalledWith(expected: string): void {
    expect(this.searchByEmailMock).toHaveBeenCalledWith(expected);
  }

  async update(hitman: Hitman): Promise<void> {
    return this.updateMock(hitman);
  }

  assertUpdateHaveBeenCalledWith(expected: Hitman): void {
    expect(this.updateMock).toHaveBeenCalledWith(expected);
  }
}
