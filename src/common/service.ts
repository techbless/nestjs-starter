import { Model, ModelCtor } from "sequelize-typescript";
import QueryBuilder from "./filter/query.builder";

export class BaseService {
  public async findAllAndCount<T extends Model>(
    model: ModelCtor<T>,
    searchQuery: { query; sort; page; pageSize },
  ): Promise<{ rows: T[]; count: number }> {
    const { page, pageSize, sort, query } = searchQuery;

    const offset = this.getPaginationOffset(page, pageSize);

    return model.findAndCountAll({
      where: query,
      order: sort,
      offset: +offset,
      limit: +pageSize,
    });
  }

  public buildSequelizeQuery(validKey, reqQuery) {
    const query = QueryBuilder.buildFilterQuery(validKey, reqQuery);
    const sort = QueryBuilder.buildSortQuery(reqQuery.sort);
    const page = reqQuery.page || 1;
    const pageSize = reqQuery.pageSize || 10;

    return { query, sort, page, pageSize };
  }

  getPaginationOffset(page, pageSize) {
    let offset = 0;

    if (page > 1) {
      offset = pageSize * (page - 1);
    }

    return offset;
  }
}
