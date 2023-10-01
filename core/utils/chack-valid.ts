const checkValid = (filters: SelectFilter[][], item: any): boolean => {
  let andResult = true;
  for (const orFilters of filters) {
    let orResult = false;
    for (const filter of orFilters) {
      if (filter(item)) orResult = true;
    }

    if (!orResult) {
      andResult = false;
      break;
    }
  }

  return andResult;
};

export { checkValid };
