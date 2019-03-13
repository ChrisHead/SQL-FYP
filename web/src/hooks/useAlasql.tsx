import * as React from "react"
import { api } from "src/api"
import { AppContext } from "src/AppContext"
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

export interface IHistory {
  dateTime: string
  value: string
  error: string
  answerError: string
  completed: boolean
}

export function useAlasql() {
  console.log("alasql")
}

export function DbStore() {
  const history: IHistory[] = []

  const results = []

  const answerResults = []

  const db: ITable[] = []

  const resetToFactoryDb: ITable[] = [
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
          comm: null,
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
          comm: null,
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
          comm: null,
          deptno: 30,
        },
        {
          empno: 7782,
          ename: "Clark",
          job: "Manager",
          mgr: 7839,
          hiredate: "09/06/1981",
          sal: 2450,
          comm: null,
          deptno: 10,
        },
        {
          empno: 7788,
          ename: "Scott",
          job: "Analyst",
          mgr: 7566,
          hiredate: "09/12/1982",
          sal: 3000,
          comm: null,
          deptno: 20,
        },
        {
          empno: 7839,
          ename: "King",
          job: "President",
          mgr: "",
          hiredate: "17/11/1981",
          sal: 5000,
          comm: null,
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
          comm: null,
          deptno: 20,
        },
        {
          empno: 7900,
          ename: "James",
          job: "Clerk",
          mgr: 7698,
          hiredate: "03/12/1981",
          sal: 950,
          comm: null,
          deptno: 30,
        },
        {
          empno: 7902,
          ename: "Ford",
          job: "Analyst",
          mgr: 7566,
          hiredate: "13/12/1981",
          sal: 3000,
          comm: null,
          deptno: 20,
        },
        {
          empno: 7934,
          ename: "Miller",
          job: "Clerk",
          mgr: 7782,
          hiredate: "23/01/1982",
          sal: 1300,
          comm: null,
          deptno: 10,
        },
      ],
    },
  ]

  const answerdb: ITable[] = []

  const error: any

  const answerAcknowledgement = "Answer Correct"

  const dbKey = 1

  const ala = alasql

  constructor() {
    this.generateDb()
  }

  generateDb() {
    this.db = this.resetToFactoryDb.slice(0)
    this.db.forEach(table => {
      alasql(
        `CREATE TABLE ${table.name} (${table.columns
          .map(column => `${column.name} ${column.type}`)
          .join(",")})`
      )
      ;(alasql as any).tables[table.name].data = toJS(table.data)
    })
    alasql.options.casesensitive = false
    this.refreshDb()
  }

  refreshDb() {
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
    this.dbKey++
  }

  @action.bound
  executeSql(sql) {
    this.results = []
    this.error = ""
    try {
      this.results = alasql(sql)
    } catch (err) {
      this.error = err.message
    }
    this.refreshDb()
  }

  checkAnswer(query): { error?: string; correct?: boolean } {
    this.createAnswerDb()
    const { result, error } = this.executeModelAnswer(query)
    this.cleanUpAnswerDb()
    if (error) {
      return { error }
    }
    return this.compareAnswer(result, error)
  }

  createAnswerDb() {
    const alasql = require("alasql")
    alasql("CREATE DATABASE tempDb")
    alasql("USE tempDb")
    this.resetToFactoryDb.forEach(table => {
      alasql(
        `CREATE TABLE ${table.name} (${table.columns
          .map(column => `${column.name} ${column.type}`)
          .join(",")})`
      )
      ;(alasql as any).tables[table.name].data = table.data
    })
    alasql.options.casesensitive = false
  }

  executeModelAnswer(query) {
    let result
    let error = ""
    try {
      result = alasql(query)
    } catch (err) {
      error = err.message
    }
    return { result, error }
  }

  cleanUpAnswerDb() {
    alasql("DROP DATABASE tempDb")
    alasql("USE alasql")
  }

  compareAnswer(answer, error) {
    try {
      const results: any = toJS(this.results)
      if (error !== "") {
        return { correct: false, error }
      } else if (Array.isArray(results)) {
        if (results.length !== answer.length) {
          if (results.length < answer.length) {
            return {
              correct: false,
              error: "Number of rows does not match: Too few rows",
            }
          } else {
            return {
              correct: false,
              error: "Number of rows does not match: Too many rows",
            }
          }
        } else {
          const resultsProps = Object.keys(results[0])
          const answerProps = Object.keys(answer[0])
          if (resultsProps.length !== answerProps.length) {
            if (resultsProps.length < answerProps.length) {
              return {
                correct: false,
                error: "Number of columns does not match: Too few columns",
              }
            } else {
              return {
                correct: false,
                error: "Number of columns does not match: Too many columns",
              }
            }
          } else {
            for (const i in answer) {
              for (const k in answer[0]) {
                if (results[i][k] !== answer[i][k]) {
                  return {
                    correct: false,
                    error: "Values of rows do not match",
                  }
                }
              }
            }
            return { correct: true, error: this.answerAcknowledgement }
          }
        }
      } else {
        return { correct: false, error: "Answer incorrect" }
      }
    } catch (err) {
      console.error(err)
      return { correct: false, error: "Answer incorrect" }
    }
  }

  clear() {
    this.results = []
    this.error = ""
    Object.keys((alasql as any).tables).forEach(name => {
      alasql(`DROP TABLE ${name}`)
    })
    this.generateDb()
  }

  clearResults() {
    this.results = []
    this.error = ""
  }

  clearHistory() {
    this.history = []
  }
}
