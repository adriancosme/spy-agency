import { Criteria } from "../../../Shared/domain/criteria/Criteria";
import { OrderBy } from "../../../Shared/domain/criteria/OrderBy";
import { Filters } from "../../../Shared/domain/criteria/Filters";
import { Operator } from "../../../Shared/domain/criteria/FilterOperator";
import { OrderType } from "../../../Shared/domain/criteria/OrderType";
import { SelectQueryBuilder } from "typeorm/query-builder/SelectQueryBuilder";
import { Filter } from "../../../Shared/domain/criteria/Filter";

export class TypeOrmCriteriaConverter {
  public convert<T>(queryBuilder: SelectQueryBuilder<T>, criteria: Criteria): SelectQueryBuilder<T> {
    queryBuilder.skip(criteria.offset || 0);
    queryBuilder.take(criteria.limit || 1000);

    if (criteria.order.hasOrder()) {
      const orderBy: OrderBy = criteria.order.orderBy;
      const orderType: OrderType = criteria.order.orderType;
      const sortDirection: 'ASC' | 'DESC' = orderType.isAsc() ? 'ASC' : 'DESC';
      queryBuilder.orderBy(orderBy.value, sortDirection);
    }

    if (criteria.hasFilters()) {
      const filters: Filters = criteria.filters;
      filters.filters.forEach((filter: Filter) => {
        const { operator, field, value } = filter;
        switch (operator.value) {
          case Operator.EQUAL:
            queryBuilder.andWhere(`${field.value} = :${field.value}`, { [field.value]: value.value });
            break;
          case Operator.NOT_EQUAL:
            queryBuilder.andWhere(`${field.value} != :${field.value}`, { [field.value]: value.value });
            break;
          case Operator.GT:
            queryBuilder.andWhere(`${field.value} > :${field.value}`, { [field.value]: value.value });
            break;
          case Operator.LT:
            queryBuilder.andWhere(`${field.value} < :${field.value}`, { [field.value]: value.value });
            break;
          case Operator.GTE:
            queryBuilder.andWhere(`${field.value} >= :${field.value}`, { [field.value]: value.value });
            break;
          case Operator.LTE:
            queryBuilder.andWhere(`${field.value} <= :${field.value}`, { [field.value]: value.value });
            break;
          case Operator.CONTAINS:
            queryBuilder.andWhere(`${field.value} LIKE :${field.value}`, { [field.value]: `%${value.value}%` });
            break;
          case Operator.NOT_CONTAINS:
            queryBuilder.andWhere(`${field.value} NOT LIKE :${field.value}`, { [field.value]: `%${value.value}%` });
            break;
          default:
            throw new Error(`Unexpected operator value ${operator.value}`);
        }
      });
    }

    return queryBuilder;
  }
}
