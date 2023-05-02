import { CuidMother } from '../../Shared/domain/CuidMother';

export class HitIdMother {
  static create(value: string): string {
    return value;
  }

  static creator() {
    return () => HitIdMother.random();
  }

  static random(): string {
    return this.create(CuidMother.random());
  }
}
