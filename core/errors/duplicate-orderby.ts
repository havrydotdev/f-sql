class DuplicateOrderByError extends Error {
  constructor() {
    super("Duplicate ORDERBY");
  }
}

export { DuplicateOrderByError };
