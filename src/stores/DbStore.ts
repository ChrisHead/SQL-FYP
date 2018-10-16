import { observable, action } from "mobx"
import alasql from "alasql"

export interface ITable {
  name: string
  columns: { name: string; type: any }[]
  data: any[]
}

interface IAlaColumnType {
  columnid: string
  dbtypeid: any
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
  error: any

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
    const newdb: ITable[] = Object.keys(alasql.tables).map(name => {
      const columns = alasql.tables[name].columns.map(
        (column: IAlaColumnType) => {
          return {
            name: `${column.columnid}`,
            type: `${column.dbtypeid || "STRING"}`,
          }
        }
      )
      const data = alasql.tables[name].data
      return { name, columns, data }
    })
    this.db = newdb
  }
}
