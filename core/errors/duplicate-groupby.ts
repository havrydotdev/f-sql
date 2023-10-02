class DuplicateGroupByError extends Error {
  constructor() {
    super("Duplicate ORDERBY");
  }
}

export { DuplicateGroupByError };
