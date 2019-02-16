import moment from "moment"
export const labs = [
  {
    labNumber: 3,
    dataTime: moment()
      .subtract(4, "days")
      .toString(),
    questions: [
      {
        question: "If you haven’t done so yet, finish the exercises from the previous lab.",
        answer: "SELECT * FROM table",
        databaseId: "2",
        startingText: "None",
        response: "This has been a response",
        respondAfter: 3,
        autoResponse: false,
      },
      {
        question: "Display the name of each employee with his department name.",
        answer: "SELECT * FROM table",
        databaseId: "2",
        startingText: "None",
        response: "This has been a response",
        respondAfter: 3,
        autoResponse: false,
      },
      {
        question:
          "Display a list of ALL departments with their employees (i.e. list a department even if it hasn’t got any employees).",
        answer: "SELECT * FROM table",
        databaseId: "2",
        startingText: "None",
        response: "This has been a response",
        respondAfter: 3,
        autoResponse: false,
      },
      {
        question: "Display the department names with the names of their managers.",
        answer: "SELECT * FROM table",
        databaseId: "2",
        startingText: "None",
        response: "This has been a response",
        respondAfter: 3,
        autoResponse: false,
      },
      {
        question: "Display the names of each employee with the name of his/her boss.",
        answer: "SELECT * FROM table",
        databaseId: "2",
        startingText: "None",
        response: "This has been a response",
        respondAfter: 3,
        autoResponse: false,
      },
      {
        question:
          "Display the names of each employee with the name of their boss with a blank for the boss of the president.",
        answer: "SELECT * FROM table",
        databaseId: "2",
        startingText: "None",
        response: "This has been a response",
        respondAfter: 3,
        autoResponse: false,
      },
      {
        question:
          "Display the employee number and name of each employee who manages other employees with the number of people he or she manages.",
        answer: "SELECT * FROM table",
        databaseId: "2",
        startingText: "None",
        response: "This has been a response",
        respondAfter: 3,
        autoResponse: false,
      },
      {
        id: "8",
        question:
          "Repeat the display for the last question, but this time display the rows in descending order of the number of employees managed.",
        answer: "SELECT * FROM table",
        databaseId: "1",
        startingText: "None",
        response: "This has been a response",
        respondAfter: 3,
        autoResponse: false,
      },
    ],
  },
  {
    labNumber: 4,
    dataTime: moment()
      .subtract(2, "days")
      .toString(),
    questions: [
      {
        question: "lab 4 question 1",
        answer: "SELECT * FROM table",
        databaseId: "2",
        startingText: "None",
        response: "This has been a response",
        respondAfter: 3,
        autoResponse: false,
      },

      {
        question: "lab 4 question 2",
        answer: "SELECT * FROM table",
        databaseId: "2",
        startingText: "None",
        response: "This has been a response",
        respondAfter: 3,
        autoResponse: false,
      },

      {
        question: "lab 4 question 3",
        answer: "SELECT * FROM table",
        databaseId: "2",
        startingText: "None",
        response: "This has been a response",
        respondAfter: 3,
        autoResponse: false,
      },
    ],
  },
  {
    labNumber: 5,
    dataTime: moment()
      .subtract(30, "minutes")
      .toString(),
    questions: [
      {
        question: "lab 5 question 1",
        answer: "SELECT * FROM table",
        databaseId: "2",
        startingText: "None",
        response: "This has been a response",
        respondAfter: 3,
        autoResponse: false,
      },
    ],
  },
  {
    labNumber: 6,
    dataTime: moment()
      .add(4, "days")
      .toString(),
    questions: [
      {
        question: "lab 6 question 1",
        answer: "SELECT * FROM table",
        databaseId: "2",
        startingText: "None",
        response: "This has been a response",
        respondAfter: 3,
        autoResponse: false,
      },
    ],
  },
]
