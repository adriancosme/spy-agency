import { HitmanId } from './HitmanId';
import {AggregateRoot} from "../../Shared/domain/AggregateRoot";

export class HitmanManager extends AggregateRoot {
  readonly hitmanId: HitmanId;
  readonly managerId: HitmanId;

  constructor(hitmanId: HitmanId, managerId: HitmanId) {
    super();
    this.hitmanId = hitmanId;
    this.managerId = managerId;
  }

  static fromPrimitives(plainData: { hitmanId: number; managerId: number }) {
    return new HitmanManager(
      new HitmanId(plainData.hitmanId),
      new HitmanId(plainData.managerId),
    );
  }

  toPrimitives() {
    return {
      hitmanId: this.hitmanId.value,
      managerId: this.managerId.value,
    };
  }
}
