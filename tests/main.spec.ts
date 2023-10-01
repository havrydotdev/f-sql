import { DuplicateFromError, DuplicateSelectError } from "../core/errors";
import { query } from "../core/query_builder";

describe("SQL tests", () => {
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
    ).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);

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

  it("Basic GROUP BY tests with SELECT", () => {
    const res = query()
      .select(professionGroup)
      .from(people)
      .groupBy((person) => person.job)
      .execute();

    const parityRes = query().select().from(numbers).groupBy(parity).execute();

    expect(res).toHaveLength(2);
    expect(res).toEqual(["plumber", "teacher"]);
    expect(parityRes).toHaveLength(2);
    expect(parityRes).toEqual([
      ["odd", [1, 3, 5, 7, 9]],
      ["even", [2, 4, 6, 8]],
    ]);
  });

  // TODO
  // it("Multilevel GROUP BY tests", () => {
  //   const res = query().select().from(numbers).groupBy(parity, prime).execute();

  //   expect(res).toEqual([
  //     [
  //       "odd",
  //       [
  //         ["divisible", [1, 9]],
  //         ["prime", [3, 5, 7]],
  //       ],
  //     ],
  //     [
  //       "even",
  //       [
  //         ["prime", [2]],
  //         ["divisible", [4, 6, 8]],
  //       ],
  //     ],
  //   ]);
  // });

  it("Basic HAVING tests", () => {
    const res = query()
      .select()
      .from(numbers)
      .groupBy(parity)
      .having(odd)
      .execute();

    expect(res[0][1]).toHaveLength(5);
    expect(res).toEqual([["odd", [1, 3, 5, 7, 9]]]);
  });

  it("Basic ORDER BY tests", () => {
    const res = query()
      .select()
      .from(numbers)
      .orderBy((num1, num2) => num1 - num2)
      .execute();

    expect(res).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1]);
  });
});

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const parity = (num: number) => {
  return num % 2 === 0 ? "even" : "odd";
};

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

const professionGroup = (group: GroupByArray) => {
  return group[0];
};

const isPrime = (num: number) => {
  if (num < 2) {
    return false;
  }
  var divisor = 2;
  for (; num % divisor !== 0; divisor++);
  return divisor === num;
};

const prime = (num: number) => {
  return isPrime(num) ? "prime" : "divisible";
};

const odd = (group: GroupByArray) => {
  return group[0] === "odd";
};
