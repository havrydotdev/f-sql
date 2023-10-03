import { DuplicateFromError, DuplicateSelectError } from "../core/errors";
import { query } from "../core/query_builder";
import {
  numbers,
  users,
  people,
  professionGroup,
  parity,
  odd,
  student,
  students,
  teacherJoin,
  teachers,
  tutor1,
  greaterThan4,
  lessThan3,
  persons,
  name,
  profession,
  age,
  maritalStatus,
  professionCount,
  multilevelRes,
  naturalCompare,
  frequency,
  greatThan1,
  id,
  isPair,
} from "./test.utils";

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

  it("Numbers tests", () => {
    const res = query()
      .select()
      .from(numbers)
      .where(lessThan3, greaterThan4)
      .execute();

    expect(res).toEqual([1, 2, 5, 6, 7, 8, 9]);
  });

  it("Multilevel GROUPBY tests", () => {
    const res = query()
      .select()
      .from(persons)
      .groupBy(profession, name, age, maritalStatus)
      .execute();

    const res2 = query()
      .select(professionCount)
      .from(persons)
      .groupBy(profession)
      .execute();

    const res3 = query()
      .select(professionCount)
      .from(persons)
      .groupBy(profession)
      .orderBy(naturalCompare)
      .execute();

    console.log(JSON.stringify(res3));

    expect(res).toEqual(multilevelRes);

    expect(res2).toEqual([
      ["teacher", 3],
      ["scientific", 3],
      ["politician", 1],
    ]);

    expect(res3).toEqual([
      ["politician", 1],
      ["scientific", 3],
      ["teacher", 3],
    ]);
  });

  it("Frequency tests", () => {
    const nums = [1, 2, 1, 3, 5, 6, 1, 2, 5, 6];
    const res = query()
      .select(frequency)
      .from(nums)
      .groupBy(id)
      .having(greatThan1)
      .having(isPair)
      .execute();

    expect(res).toEqual([
      {
        value: 2,
        frequency: 2,
      },
      {
        value: 6,
        frequency: 2,
      },
    ]);
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
      .orderBy((num1, num2) => num2 - num1)
      .execute();

    expect(res).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1]);
  });

  it("Multiple data sources tests", () => {
    const res = query()
      .select(student)
      .from(teachers, students)
      .where(teacherJoin)
      .execute();

    expect(res).toEqual([
      { studentName: "Michael", teacherName: "Peter" },
      { studentName: "Rose", teacherName: "Anna" },
    ]);
  });

  it("Test WHERE with AND", () => {
    const res = query()
      .select(student)
      .from(teachers, students)
      .where(teacherJoin)
      .where(tutor1)
      .execute();

    expect(res).toHaveLength(1);
    expect(res).toEqual([{ studentName: "Michael", teacherName: "Peter" }]);
  });
});
