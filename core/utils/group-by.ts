const groupBy = (executeData: any[], ...groupByFns: any[]): any => {
  if (!groupByFns.length) {
    return executeData;
  }

  const groupByFn = groupByFns.shift();
  const groupTypes: any = {};

  const grouped = executeData.reduce((grouped, item) => {
    const key = groupByFn!(item);
    groupTypes[key] = typeof key;
    grouped[key] = grouped[key] || [];
    grouped[key].push(item);
    return grouped;
  }, {});

  return Object.entries(grouped).map(([groupName, values]) => {
    return [
      groupTypes[groupName] === "number" ? parseInt(groupName) : groupName,
      groupBy(values as any[], ...groupByFns.slice()),
    ];
  });
};

export { groupBy };
