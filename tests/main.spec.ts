import { DuplicateFromError, DuplicateSelectError } from "../core/errors";
import { query } from "../core/query_builder";

describe("SQL tests", () => {
  const numbers = [1, 2, 3];

  const users = [
    { name: "John", age: 18 },
    { name: "Jane", age: 21 },
    { name: "Jack", age: 20 },
  ];

  const people = [
    { name: "Jane", age: 21, job: "plumber" },
    { name: "Jane", age: 21, job: "plumber" },
    { name: "John", age: 18, job: "teacher" },
    { name: "Jack", age: 20, job: "teacher" },
    { name: "John", age: 18, job: "teacher" },
    { name: "Jack", age: 20, job: "teacher" },
  ];

  it("Basic SELECT tests", () => {
    let numbers = [1, 2, 3];
    expect(query().select().from(numbers).execute()).toEqual(numbers);
  });

  it("Basic SELECT tests with field", () => {
    expect(
      query()
        .select((n) => n * 2)
        .from(numbers)
        .execute()
    ).toEqual([2, 4, 6]);

    expect(
      query()
        .select((user) => user.name)
        .from(users)
        .execute()
    ).toEqual(["John", "Jane", "Jack"]);
  });

  it("Duplicate SELECT tests", () => {
    // Expect DuplicateSelectError to be thrown
    try {
      query().select().select().from(users).execute();
    } catch (e) {
      expect(e).toBeInstanceOf(DuplicateSelectError);
    }
  });

  it("Duplicate FROM tests", () => {
    // Expect DuplicateFromError to be thrown
    try {
      query().select().from(users).from(numbers).execute();
    } catch (e) {
      expect(e).toBeInstanceOf(DuplicateFromError);
    }
  });

  it("Only execute tests", () => {
    expect(query().execute()).toEqual([]);
  });

  it("Only select tests", () => {
    expect(query().select().execute()).toEqual([]);
  });

  it("Basic WHERE tests", () => {
    expect(
      query()
        .select()
        .from(users)
        .where((user) => user.age > 18)
        .execute()
    ).toEqual([
      { name: "Jane", age: 21 },
      { name: "Jack", age: 20 },
    ]);

    expect(
      query()
        .select()
        .from(users)
        .where((user) => user.age <= 18 && user.name.startsWith("J"))
        .execute()
    ).toEqual([{ name: "John", age: 18 }]);
  });

  it("Basic GROUP BY tests", () => {
    const res = query()
      .select()
      .from(people)
      .groupBy((user) => user.job)
      .execute();
    console.log(res[0]);
    console.log(res[1]);

    expect(res[0][1]).toHaveLength(2);
    expect(res[1][1]).toHaveLength(4);
  });

  it("Basic GROUP BY tests with WHERE", () => {
    const res = query()
      .select()
      .from(people)
      .where((user) => user.age > 18)
      .groupBy((user) => user.job)
      .execute();

    expect(res[0][1]).toHaveLength(2);
    expect(res[1][1]).toHaveLength(2);
  });
});
