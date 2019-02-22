"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var pg_promise_1 = __importDefault(require("pg-promise"));
exports.db = {
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    ssl: process.env.DB_SSL === "true",
};
exports.secretKey = process.env.SECRET_KEY ||
    (function () {
        throw "no secret set";
    })();
exports.pgp = pg_promise_1.default({
    query: function (e) {
        var str = e.query;
        str = str.replace(/crypt\('.*', "password"\)/, "[PASSWORD]");
        console.log(chalk_1.default.green(str));
    },
});
