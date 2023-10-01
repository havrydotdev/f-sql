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

export {
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
