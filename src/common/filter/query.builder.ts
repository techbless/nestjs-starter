import { Op } from "sequelize";

class QueryBuilder {
  static buildFilterQuery(validKey: string[], query: Record<string, any>) {
    const result: Record<string, any> = {};

    Object.entries(query).forEach(([key, value]) => {
      if (!value || !validKey.includes(key)) {
        return;
      }

      if (typeof value === "object" && !Array.isArray(value)) {
        result[key] = {};

        Object.entries(value).forEach(([op, val]) => {
          result[key][Op[op as keyof typeof Op]] = val;
        });

        return;
      }

      if (typeof value === "string" && value.startsWith("%") && value.endsWith("%")) {
        value = value.replace(/^%/, ""); // 시작이 %면, 제거
        value = value.replace(/%$/, ""); // 마지막이 %면, 제거
        value = decodeURI(value);
        value = "%" + value + "%";

        result[key] = { [Op.like]: value };
        return;
      }

      result[key] = value;
    });

    return result;
  }

  static buildSortQuery(query?: string) {
    if (!query) {
      return null;
    }

    const [field, order] = query.startsWith("-") ? [query.slice(1), "DESC"] : [query, "ASC"];
    return [[field, order]];
  }
}

export default QueryBuilder;
