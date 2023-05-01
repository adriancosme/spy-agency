import { TypeOrmRepository } from "../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository";
import { Hit, HitRepository } from "../../domain";
import { EntitySchema } from "typeorm";
import { Criteria } from "../../../Shared/domain/criteria/Criteria";
import { HitEntity } from "./typeorm/HitEntity";

export class TypeOrmHitsRepository extends TypeOrmRepository<Hit> implements HitRepository {
  protected entitySchema(): EntitySchema<Hit> {
    return HitEntity
  }

  delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  async matching(criteria: Criteria): Promise<Hit[]> {
    return this.searchByCriteria(criteria);
  }

  async save(hit: Hit): Promise<void> {
    return await this.persist(hit);
  }

  async searchAll(): Promise<Hit[]> {
    const repository = await this.repository();
    return await repository.find();
  }

  async searchById(id: string): Promise<Hit> {
    const repository = await this.repository();
    return await repository.findOne({
      where: {
        id: id
      }
    });
  }

  async update(hit: Hit): Promise<void> {
    await this.persist(hit);
  }

}
