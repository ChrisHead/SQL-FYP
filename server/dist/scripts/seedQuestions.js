"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
exports.labs = [
    {
        labNumber: 4,
        dataTime: moment_1.default()
            .subtract(2, "days")
            .toString(),
        questions: [
            {
                question: "Display the names and job titles of all employees with the same job as Jones.",
                modelAnswer: "SELECT ename, job FROM emp WHERE job = (SELECT job FROM emp WHERE ename = 'Jones')",
                databaseId: "2",
                startingText: "None",
            },
            {
                question: "Display the names and department name of all employees working in the same city as Jones.",
                modelAnswer: "SELECT ename, dname FROM emp, dept WHERE emp.deptno = dept.deptno AND loc = (SELECT loc FROM emp, dept WHERE emp.deptno = dept.deptno AND ename = 'Jones')",
                databaseId: "2",
                startingText: "None",
            },
            {
                question: "Display the name and salary of the employee with the lowest salary.",
                modelAnswer: "SELECT ename, sal FROM emp WHERE sal = (SELECT MIN(sal) FROM emp)",
                databaseId: "2",
                startingText: "None",
            },
            {
                question: "Display the names and salaries of all employees except the one with the lowest salary.",
                modelAnswer: "SELECT ename, sal FROM emp WHERE sal > (SELECT MIN(sal) FROM emp)",
                databaseId: "2",
                startingText: "None",
            },
            {
                question: "Display the names of all employees who have the same jobs as employees in the sales department.",
                modelAnswer: "SELECT ename FROM emp WHERE job IN (SELECT job FROM emp, dept WHERE emp.deptno = dept.deptno AND dname = 'Sales')",
                databaseId: "2",
                startingText: "None",
            },
            {
                question: "Display the names of all employees who work in a department that employs an analyst.",
                modelAnswer: "SELECT ename FROM emp WHERE deptno IN (SELECT DISTINCT deptno FROM emp WHERE job = 'Analyst')",
                databaseId: "2",
                startingText: "None",
            },
            {
                question: "Display the names of all employees with their job title, their current salary and their salary following a 10% pay rise for clerks and a 7% pay rise for all other employees. Call the new column 'newsal'.",
                modelAnswer: "SELECT ename, job, sal, 1.1 * sal AS 'newsal' FROM emp WHERE job = 'Clerk' UNION SELECT ename, job, sal, 1.07 * sal AS 'newsal' FROM emp WHERE job <> 'Clerk'",
                databaseId: "2",
                startingText: "None",
            },
            {
                question: "Display the names of all employees with their salary and commission earned. Employees with a null commission field should have 0 in the commission column.",
                modelAnswer: "SELECT ename, sal, comm FROM emp WHERE comm IS NOT NULL UNION SELECT ename, sal, 0 FROM emp WHERE comm IS NULL",
                databaseId: "2",
                startingText: "None",
            },
            {
                question: "Display the names of ALL employees with the total they have earned (i.e., salary plus commission). Call the new column 'earnings'.",
                modelAnswer: "SELECT ename, sal + comm AS earnings FROM emp WHERE comm IS NOT NULL UNION SELECT ename, sal FROM emp WHERE comm IS NULL",
                databaseId: "2",
                startingText: "None",
            },
            {
                question: "Repeat the display for the last question but this time display in descending order of earnings.",
                modelAnswer: "select * from ( SELECT ename, sal + comm AS earnings FROM emp WHERE comm IS NOT NULL UNION SELECT ename, sal FROM emp WHERE comm IS NULL) ORDER BY earnings DESC",
                databaseId: "2",
                startingText: "None",
            },
        ],
    },
];
