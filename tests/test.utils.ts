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

const persons = [
  {
    name: "Peter",
    profession: "teacher",
    age: 20,
    maritalStatus: "married",
  },
  {
    name: "Michael",
    profession: "teacher",
    age: 50,
    maritalStatus: "single",
  },
  {
    name: "Peter",
    profession: "teacher",
    age: 20,
    maritalStatus: "married",
  },
  {
    name: "Anna",
    profession: "scientific",
    age: 20,
    maritalStatus: "married",
  },
  {
    name: "Rose",
    profession: "scientific",
    age: 50,
    maritalStatus: "married",
  },
  {
    name: "Anna",
    profession: "scientific",
    age: 20,
    maritalStatus: "single",
  },
  {
    name: "Anna",
    profession: "politician",
    age: 50,
    maritalStatus: "married",
  },
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

var teachers = [
  {
    teacherId: "1",
    teacherName: "Peter",
  },
  {
    teacherId: "2",
    teacherName: "Anna",
  },
];

var students = [
  {
    studentName: "Michael",
    tutor: "1",
  },
  {
    studentName: "Rose",
    tutor: "2",
  },
];

const teacherJoin = (join: [any, any]) => {
  return join[0].teacherId === join[1].tutor;
};

const student = (join: [any, any]) => {
  return { studentName: join[1].studentName, teacherName: join[0].teacherName };
};

function tutor1(join: [any, any]) {
  return join[1].tutor === "1";
}

function lessThan3(number: number) {
  return number < 3;
}

function greaterThan4(number: number) {
  return number > 4;
}

function profession(person: any) {
  return person.profession;
}

function name(person: any) {
  return person.name;
}

function age(person: any) {
  return person.age;
}

function maritalStatus(person: any) {
  return person.maritalStatus;
}

function professionCount(group: any) {
  return [group[0], group[1].length];
}

function naturalCompare(value1: any, value2: any) {
  if (value1 < value2) {
    return -1;
  } else if (value1 > value2) {
    return 1;
  } else {
    return 0;
  }
}

const multilevelRes = [
  [
    "teacher",
    [
      [
        "Peter",
        [
          [
            20,
            [
              [
                "married",
                [
                  {
                    name: "Peter",
                    profession: "teacher",
                    age: 20,
                    maritalStatus: "married",
                  },
                  {
                    name: "Peter",
                    profession: "teacher",
                    age: 20,
                    maritalStatus: "married",
                  },
                ],
              ],
            ],
          ],
        ],
      ],
      [
        "Michael",
        [
          [
            50,
            [
              [
                "single",
                [
                  {
                    name: "Michael",
                    profession: "teacher",
                    age: 50,
                    maritalStatus: "single",
                  },
                ],
              ],
            ],
          ],
        ],
      ],
    ],
  ],
  [
    "scientific",
    [
      [
        "Anna",
        [
          [
            20,
            [
              [
                "married",
                [
                  {
                    name: "Anna",
                    profession: "scientific",
                    age: 20,
                    maritalStatus: "married",
                  },
                ],
              ],
              [
                "single",
                [
                  {
                    name: "Anna",
                    profession: "scientific",
                    age: 20,
                    maritalStatus: "single",
                  },
                ],
              ],
            ],
          ],
        ],
      ],
      [
        "Rose",
        [
          [
            50,
            [
              [
                "married",
                [
                  {
                    name: "Rose",
                    profession: "scientific",
                    age: 50,
                    maritalStatus: "married",
                  },
                ],
              ],
            ],
          ],
        ],
      ],
    ],
  ],
  [
    "politician",
    [
      [
        "Anna",
        [
          [
            50,
            [
              [
                "married",
                [
                  {
                    name: "Anna",
                    profession: "politician",
                    age: 50,
                    maritalStatus: "married",
                  },
                ],
              ],
            ],
          ],
        ],
      ],
    ],
  ],
];

export {
  multilevelRes,
  naturalCompare,
  professionCount,
  age,
  maritalStatus,
  name,
  profession,
  persons,
  lessThan3,
  greaterThan4,
  tutor1,
  numbers,
  parity,
  users,
  people,
  professionGroup,
  prime,
  odd,
  teacherJoin,
  student,
  teachers,
  students,
};
