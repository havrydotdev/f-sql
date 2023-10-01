import QueryBuilder from "./query-builder";

export const query = (): QueryBuilder => {
  return new QueryBuilder();
};
