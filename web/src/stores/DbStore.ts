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

export interface ILab {
  id: string
  labNumber: number
  dateTime: string
  questions: {
    id: string
    question: string
    modelAnswer: string
    answer?: {
      id: string
      questionId: string
      history: IHistory[]
      activity: {}[]
      completed: boolean
    }
    databaseId: string
    startingText: string
    response: string
    respondAfter: number
    autoResponse: boolean
  }[]
}

export interface IQuestion {
  id: string
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

export interface IHistory {
  dateTime: string
  value: string
  error: string
  completed: boolean
}

interface IQuestionActivity {
  dateTime: string
  question: string
  activity: string
}

export class DbStore {
  @observable
  sqlValue = ""

  @observable
  history: IHistory[] = []

  @observable
  activity: IQuestionActivity[] = [
    {
      dateTime: new Date().toLocaleString(),
      question: "example question id",
      activity: "opened",
    },
    {
      dateTime: new Date().toLocaleString(),
      question: "example question id",
      activity: "closed",
    },
  ]

  @observable
  currentQuestion: string

  @observable
  currentLab: string

  @observable
  results = []

  @observable
  db: ITable[] = [
    {
      name: "dept",
      columns: [
        { name: "dept", type: "int" },
        { name: "dname", type: "string" },
        { name: "loc", type: "string" },
      ],
      data: [
        { dept: 10, dname: "Accounting", loc: "New York" },
        { dept: 20, dname: "Research", loc: "Dallas" },
        { dept: 30, dname: "Sales", loc: "Chicago" },
        { dept: 40, dname: "Operations", loc: "Boston" },
      ],
    },
    {
      name: "emp",
      columns: [
        { name: "empno", type: "int" },
        { name: "ename", type: "string" },
        { name: "job", type: "string" },
        { name: "mgr", type: "int" },
        { name: "hiredate", type: "date" },
        { name: "sal", type: "int" },
        { name: "comm", type: "int" },
        { name: "deptno", type: "int" },
      ],
      data: [
        {
          empno: 7369,
          ename: "Smith",
          job: "Clerk",
          mgr: 7902,
          hiredate: "17/12/1980",
          sal: 800,
          comm: "",
          deptno: 20,
        },
        {
          empno: 7499,
          ename: "Allen",
          job: "Salesman",
          mgr: 7902,
          hiredate: "20/02/1981",
          sal: 1600,
          comm: 300,
          deptno: 30,
        },
        {
          empno: 7521,
          ename: "Ward",
          job: "Salesman",
          mgr: 7698,
          hiredate: "22/02/1981",
          sal: 1250,
          comm: 500,
          deptno: 30,
        },
        {
          empno: 7566,
          ename: "Jones",
          job: "Manager",
          mgr: 7839,
          hiredate: "02/04/1981",
          sal: 2975,
          comm: "",
          deptno: 20,
        },
        {
          empno: 7654,
          ename: "Martin",
          job: "Salesman",
          mgr: 7698,
          hiredate: "28/09/1981",
          sal: 1250,
          comm: 1400,
          deptno: 30,
        },
        {
          empno: 7698,
          ename: "Blake",
          job: "Manager",
          mgr: 7839,
          hiredate: "01/05/1981",
          sal: 2850,
          comm: "",
          deptno: 30,
        },
        {
          empno: 7782,
          ename: "Clark",
          job: "Manager",
          mgr: 7839,
          hiredate: "09/06/1981",
          sal: 2450,
          comm: "",
          deptno: 10,
        },
        {
          empno: 7788,
          ename: "Scott",
          job: "Analyst",
          mgr: 7566,
          hiredate: "09/12/1982",
          sal: 3000,
          comm: "",
          deptno: 20,
        },
        {
          empno: 7839,
          ename: "King",
          job: "President",
          mgr: "",
          hiredate: "17/11/1981",
          sal: 5000,
          comm: "",
          deptno: 10,
        },
        {
          empno: 7844,
          ename: "Turner",
          job: "Salesman",
          mgr: 7698,
          hiredate: "08/09/1981",
          sal: 1500,
          comm: 0,
          deptno: 30,
        },
        {
          empno: 7876,
          ename: "Adam",
          job: "Clerk",
          mgr: 7788,
          hiredate: "12/01/1983",
          sal: 1100,
          comm: "",
          deptno: 20,
        },
        {
          empno: 7900,
          ename: "James",
          job: "Clerk",
          mgr: 7698,
          hiredate: "03/12/1981",
          sal: 950,
          comm: "",
          deptno: 30,
        },
        {
          empno: 7902,
          ename: "Ford",
          job: "Analyst",
          mgr: 7566,
          hiredate: "13/12/1981",
          sal: 3000,
          comm: "",
          deptno: 20,
        },
        {
          empno: 7934,
          ename: "Miller",
          job: "Clerk",
          mgr: 7782,
          hiredate: "23/01/1982",
          sal: 1300,
          comm: "",
          deptno: 10,
        },
      ],
    },
  ]

  @observable
  error: any

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
    alasql.options.casesensitive = false
  }

  @action.bound
  executeSql() {
    this.results = []
    this.error = ""
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
      alasql.options.casesensitive = false
      const data = (alasql as any).tables[name].data
      return { name, columns, data }
    })
    this.db = newdb
  }

  clearResults() {
    this.results = []
    this.error = ""
  }

  clearHistory() {
    this.history = []
  }
}
