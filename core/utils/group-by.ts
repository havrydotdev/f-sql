const groupBy = (data: any[], groupKey: SelectGroupBy): GroupByArray[] => {
  const grouped: GroupByArray[] = [];

  data.forEach((entity) => {
    const key = groupKey(entity);
    const group = grouped.find((group) => group[0] === key);

    if (group) {
      group[1].push(entity);
    } else {
      grouped.push([key, [entity]]);
    }
  });

  return grouped;
};

export { groupBy };
