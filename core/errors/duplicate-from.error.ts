class DuplicateFromError extends Error {
  constructor() {
    super("Duplicate FROM");
  }
}

export { DuplicateFromError };
