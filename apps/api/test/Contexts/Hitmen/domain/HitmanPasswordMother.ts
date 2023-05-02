import { MotherCreator } from '../../Shared/domain/MotherCreator';

export class HitmanPasswordMother {
  static create(value?: string): string {
    return value || this.random();
  }
  static random(): string {
    return MotherCreator.random().internet.password();
  }
}
