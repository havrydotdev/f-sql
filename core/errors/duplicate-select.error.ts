class DuplicateSelectError extends Error {
  constructor() {
    super("Duplicate SELECT");
  }
}

export { DuplicateSelectError };
