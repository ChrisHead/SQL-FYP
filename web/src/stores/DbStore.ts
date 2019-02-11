import { observable, action } from "mobx"
import alasql from "alasql"

export interface ITable {
  name: string
  columns: { name: string; type: string }[]
  data: any[]
}

interface IAlaColumnType {
  columnid: string
  dbtypeid: any
}

export interface IStudentQuestions {
  tutorial: string
  questions: { number: number; question: string; completed: boolean }[]
}

export interface IUsers {
  userId: string
}

export interface ILab {
  labNumber: number
  dateTime: string
  questions: number[]
}

interface ICompletedQuestions {
  tutorial: string
  question: number
}

interface IAdminQuestions {
  id: number
  question: string
  answer: string
  database: number
  startingText: string
  response: string
  respondAfter: number
  autoResponse: boolean
}

interface IConditions {
  conditionOne: boolean
  conditionTwo: boolean
  conditionThree: boolean
  conditionFour: boolean
}

export class DbStore {
  @observable
  sqlValue = ""
  @observable
  history = [
    "SELECT * FROM EMP WHERE SAL = 950",
    "SELECT DEPT.DNAME, EMP.ENAME FROM DEPT INNER JOIN EMP ON DEPT.DEPTNO=EMP.DEPTNO;",
  ]
  @observable
  tab = "results"
  @observable
  currentQuestion = ""
  @observable
  currentControl = ""
  @observable
  completedQuestions: ICompletedQuestions[] = [
    {
      tutorial: "Lab 1",
      question: 1,
    },
    {
      tutorial: "Lab 1",
      question: 2,
    },
    {
      tutorial: "Lab 1",
      question: 3,
    },
  ]
  @observable
  results = []
  @observable
  db: ITable[] = [
    {
      name: "DEPT",
      columns: [
        { name: "DEPTNO", type: "int" },
        { name: "DNAME", type: "string" },
        { name: "LOC", type: "string" },
      ],
      data: [
        { DEPTNO: 10, DNAME: "ACCOUNTING", LOC: "NEW YORK" },
        { DEPTNO: 20, DNAME: "RESEARCH", LOC: "DALLAS" },
        { DEPTNO: 30, DNAME: "SALES", LOC: "CHICAGO" },
        { DEPTNO: 40, DNAME: "OPERATIONS", LOC: "BOSTON" },
      ],
    },
    {
      name: "EMP",
      columns: [
        { name: "EMPNO", type: "int" },
        { name: "ENAME", type: "string" },
        { name: "JOB", type: "string" },
        { name: "MGR", type: "int" },
        { name: "HIREDATE", type: "date" },
        { name: "SAL", type: "int" },
        { name: "COMM", type: "int" },
        { name: "DEPTNO", type: "int" },
      ],
      data: [
        {
          EMPNO: 7369,
          ENAME: "SMITH",
          JOB: "CLERK",
          MGR: 7902,
          HIREDATE: "17/12/1980",
          SAL: 800,
          COMM: "",
          DEPTNO: 20,
        },
        {
          EMPNO: 7499,
          ENAME: "ALLEN",
          JOB: "SALESMAN",
          MGR: 7902,
          HIREDATE: "20/02/1981",
          SAL: 1600,
          COMM: 300,
          DEPTNO: 30,
        },
        {
          EMPNO: 7521,
          ENAME: "WARD",
          JOB: "SALESMAN",
          MGR: 7698,
          HIREDATE: "22/02/1981",
          SAL: 1250,
          COMM: 500,
          DEPTNO: 30,
        },
        {
          EMPNO: 7566,
          ENAME: "JONES",
          JOB: "MANAGER",
          MGR: 7839,
          HIREDATE: "02/04/1981",
          SAL: 2975,
          COMM: "",
          DEPTNO: 20,
        },
        {
          EMPNO: 7654,
          ENAME: "MARTIN",
          JOB: "SALESMAN",
          MGR: 7698,
          HIREDATE: "28/09/1981",
          SAL: 1250,
          COMM: 1400,
          DEPTNO: 30,
        },
        {
          EMPNO: 7698,
          ENAME: "BLAKE",
          JOB: "MANGER",
          MGR: 7839,
          HIREDATE: "01/05/1981",
          SAL: 2850,
          COMM: "",
          DEPTNO: 30,
        },
        {
          EMPNO: 7782,
          ENAME: "CLARK",
          JOB: "MANAGER",
          MGR: 7839,
          HIREDATE: "09/06/1981",
          SAL: 2450,
          COMM: "",
          DEPTNO: 10,
        },
        {
          EMPNO: 7788,
          ENAME: "SCOTT",
          JOB: "ANALYST",
          MGR: 7566,
          HIREDATE: "09/12/1982",
          SAL: 3000,
          COMM: "",
          DEPTNO: 20,
        },
        {
          EMPNO: 7839,
          ENAME: "KING",
          JOB: "PRESIDENT",
          MGR: "",
          HIREDATE: "17/11/1981",
          SAL: 5000,
          COMM: "",
          DEPTNO: 10,
        },
        {
          EMPNO: 7844,
          ENAME: "TURNER",
          JOB: "SALESMAN",
          MGR: 7698,
          HIREDATE: "08/09/1981",
          SAL: 1500,
          COMM: 0,
          DEPTNO: 30,
        },
        {
          EMPNO: 7876,
          ENAME: "ADAM",
          JOB: "CLERK",
          MGR: 7788,
          HIREDATE: "12/01/1983",
          SAL: 1100,
          COMM: "",
          DEPTNO: 20,
        },
        {
          EMPNO: 7900,
          ENAME: "JAMES",
          JOB: "CLERK",
          MGR: 7698,
          HIREDATE: "03/12/1981",
          SAL: 950,
          COMM: "",
          DEPTNO: 30,
        },
        {
          EMPNO: 7902,
          ENAME: "FORD",
          JOB: "ANALYST",
          MGR: 7566,
          HIREDATE: "13/12/1981",
          SAL: 3000,
          COMM: "",
          DEPTNO: 20,
        },
        {
          EMPNO: 7934,
          ENAME: "MILLER",
          JOB: "CLERK",
          MGR: 7782,
          HIREDATE: "23/01/1982",
          SAL: 1300,
          COMM: "",
          DEPTNO: 10,
        },
      ],
    },
  ]
  @observable
  studentQuestions: IStudentQuestions[] = [
    {
      tutorial: "Lab 1",
      questions: [
        {
          number: 1,
          question: "Display all information in the tables EMP and DEPT.",
          completed: true,
        },
        {
          number: 2,
          question:
            "Display only the hire date and employee name for each employee.",
          completed: true,
        },
        {
          number: 3,
          question:
            "Display the hire date, name and department number for all clerks.",
          completed: true,
        },
        {
          number: 4,
          question:
            "Display the names and salaries of all employees with a salary greater than 2000.",
          completed: true,
        },
        {
          number: 5,
          question:
            'Display the names of all employees with an "A" in their name.',
          completed: true,
        },
        {
          number: 6,
          question:
            'Display the names of all employees with an "A" as the third letter of their name.',
          completed: true,
        },
        {
          number: 7,
          question:
            "Display the names of all employees with exactly 5 letters in their name.",
          completed: true,
        },
        {
          number: 8,
          question:
            "Display the names and hire dates of all employees hired in 1981 or 1982. (Note in VBA SQL you need to refer to dates in a WHERE clause between #s, eg. #1 Jan 2000#)",
          completed: true,
        },
        {
          number: 9,
          question:
            'Display the names and dates of employees with the column headers "Name" and "Start Date".',
          completed: true,
        },
        {
          number: 10,
          question:
            "Display the names and hire dates of all employees in the order they were hired.",
          completed: true,
        },
        {
          number: 11,
          question:
            "Display the names and salaries of all employees in reverse salary order.",
          completed: true,
        },
        {
          number: 12,
          question:
            'Display "ename of department deptno earned commission comm" foreach salesman in reverse commission order. Only employees who actually earned a commission should be listed.',
          completed: true,
        },
        {
          number: 13,
          question:
            "Display the department numbers of all departments employing a clerk.",
          completed: true,
        },
      ],
    },
    {
      tutorial: "Lab 2",
      questions: [
        {
          number: 1,
          question:
            "If you haven’t done so yet, finish the exercises from the previous lab.",
          completed: false,
        },
        {
          number: 2,
          question:
            "Display the maximum, minimum and average salary and the maximum, minimum and average commission earned.",
          completed: true,
        },
        {
          number: 3,
          question:
            "Display the average salary in the company without using AVG().",
          completed: false,
        },
        {
          number: 4,
          question:
            "Display the department number, total salary payout and total commission payout for each department.",
          completed: true,
        },
        {
          number: 5,
          question:
            "Display the department number, total salary payout and total commission payout for each department that pays at least one employee commission.",
          completed: true,
        },
        {
          number: 6,
          question:
            "Display the department number and number of clerks in each department.",
          completed: false,
        },
        {
          number: 7,
          question:
            "Display the department number and total salary of employees in each department that employs four or more people.",
          completed: true,
        },
        {
          number: 8,
          question:
            "Display the employee number of each employee who manages other employees with the number of people he or she manages.",
          completed: false,
        },
        {
          number: 9,
          question:
            "Display the average salary for each job group in each department in descending order.",
          completed: true,
        },
      ],
    },
    {
      tutorial: "Lab 3",
      questions: [
        {
          number: 1,
          question:
            "If you haven’t done so yet, finish the exercises from the previous lab.",
          completed: true,
        },
        {
          number: 2,
          question:
            "Display the name of each employee with his department name.",
          completed: true,
        },
        {
          number: 3,
          question:
            "Display a list of ALL departments with their employees (i.e. list a department even if it hasn’t got any employees).",
          completed: true,
        },
        {
          number: 4,
          question:
            "Display the department names with the names of their managers.",
          completed: false,
        },
        {
          number: 5,
          question:
            "Display the names of each employee with the name of his/her boss.",
          completed: false,
        },
        {
          number: 6,
          question:
            "Display the names of each employee with the name of his/her boss with a blank for the boss of the president.",
          completed: false,
        },
        {
          number: 7,
          question:
            "Display the employee number and name of each employee who manages other employees with the number of people he or she manages.",
          completed: false,
        },
        {
          number: 8,
          question:
            "Repeat the display for the last question, but this time display the rows in descending order of the number of employees managed.",
          completed: false,
        },
      ],
    },
  ]
  @observable
  error: any
  @observable
  students: IUsers[] = [
    { userId: "B512678" },
    { userId: "B234567" },
    { userId: "B678456" },
  ]
  adminQuestions: IAdminQuestions[] = [
    {
      id: 1,
      question: "This is a question",
      answer: "This is the answer",
      database: 2,
      startingText: "None",
      response: "This has been a response",
      respondAfter: 3,
      autoResponse: false,
    },
  ]
  conditions: IConditions[] = [
    {
      conditionOne: true,
      conditionTwo: false,
      conditionThree: true,
      conditionFour: false,
    },
  ]

  ala = alasql
  constructor() {
    this.db.forEach(table => {
      alasql(
        `CREATE TABLE ${table.name} (${table.columns
          .map(column => `${column.name} ${column.type}`)
          .join(",")})`
      )
      ;(alasql as any).tables[table.name].data = table.data
    })
  }

  @action.bound
  executeSql() {
    this.results = []
    this.error = ""
    this.history.unshift(this.sqlValue)
    try {
      this.results = alasql(this.sqlValue)
    } catch (err) {
      this.error = err.message
    }
    this.sqlValue = ""
    const newdb: ITable[] = Object.keys((alasql as any).tables).map(name => {
      const columns = (alasql as any).tables[name].columns.map(
        (column: IAlaColumnType) => {
          return {
            name: `${column.columnid}`,
            type: `${column.dbtypeid || "undefinedTest"}`,
          }
        }
      )
      const data = (alasql as any).tables[name].data
      return { name, columns, data }
    })
    this.db = newdb
    this.tab = "results"
  }

  clearResults() {
    this.results = []
    this.error = ""
  }
}
