type SelectMap = (entity: any) => any;

type SelectFilter = (entity: any) => boolean;

type SelectHaving = SelectFilter;

type SelectGroupBy = SelectMap;

type SelectOrderBy = (a: any, b: any) => number;

type GroupByArray = [string, any[]];
