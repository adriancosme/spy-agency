import { Connection, EntitySchema, Repository } from 'typeorm';
import { AggregateRoot } from '../../../domain/AggregateRoot';
import { TypeOrmCriteriaConverter } from "../../../../Hits/infrastructure/persistence/TypeOrmCriteriaConverter";
import { Criteria } from "../../../domain/criteria/Criteria";

export abstract class TypeOrmRepository<T extends AggregateRoot> {
  private criteriaConverter: TypeOrmCriteriaConverter;

  constructor(private _client: Promise<Connection>) {
    this.criteriaConverter = new TypeOrmCriteriaConverter()
  }

  protected abstract entitySchema(): EntitySchema<T>;

  protected client(): Promise<Connection> {
    return this._client;
  }

  protected async repository(): Promise<Repository<T>> {
    return (await this._client).getRepository(this.entitySchema());
  }

  protected async persist(aggregateRoot: T): Promise<void> {
    const repository = await this.repository();
    await repository.save(aggregateRoot as any);
  }

  protected async searchByCriteria<D>(criteria: Criteria): Promise<T[]> {
    const repository = await this.repository();
    const queryBuilder = repository.createQueryBuilder();
    const query = this.criteriaConverter.convert<T>(queryBuilder, criteria);
    return query.getMany();
  }
}
