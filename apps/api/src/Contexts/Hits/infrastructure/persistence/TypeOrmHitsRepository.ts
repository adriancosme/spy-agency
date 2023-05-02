import { Hit, HitRepository } from "../../domain";
import { Criteria } from "../../../Shared/domain/criteria/Criteria";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Hit as HitEntity } from "../../../Hits/infrastructure/persistence/typeorm/Hit.entity";

export class TypeOrmHitsRepository implements HitRepository {
  constructor(
    @InjectRepository(HitEntity)
    private repository: Repository<HitEntity>,
  ) {}

  matching(criteria: Criteria): Promise<Hit[]> {
    return Promise.resolve([]);
  }

  async save(hit: Hit): Promise<void> {
    await this.repository.save(hit);
  }

  async searchAll(): Promise<Hit[]> {
    return await this.repository.find();
  }

  async searchById(id: string): Promise<Hit | null> {
    return await this.repository.findOne({
      where: {
        id
      }
    });
  }

  async update(hit: Hit): Promise<void> {
    await this.repository.save(hit);
  }
}
