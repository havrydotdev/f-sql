const defaultSelectMap: SelectMap = (entity: any) => entity;

const defaultSelectFilter: SelectFilter = (entity: any) => true;

const defaultHavingFilter = defaultSelectFilter;

const defaultOrderBy: SelectOrderBy = (entity: any) => 1;

export {
  defaultSelectMap,
  defaultSelectFilter,
  defaultHavingFilter,
  defaultOrderBy,
};
