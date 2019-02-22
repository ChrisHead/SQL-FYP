"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var pg_promise_1 = __importDefault(require("pg-promise"));
var config_1 = require("../src/config");
var seedQuestions_1 = require("./seedQuestions");
exports.pgp = pg_promise_1.default({
    query: function (e) {
        var str = e.query;
        str = str.replace(/crypt\('.*', "password"\)/, "[PASSWORD]");
        console.log(str);
    },
});
var conn = exports.pgp(config_1.db);
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var databases, _i, labs_1, lab, labRecord, _a, _b, questionData, question, answer, startingText, response, respondAfter, autoResponse, values, questionRecord;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, conn.any("DROP SCHEMA \"public\" CASCADE")];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, conn.any("CREATE SCHEMA \"public\"")];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, conn.any("CREATE EXTENSION IF NOT EXISTS \"pgcrypto\"")];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, conn.any("CREATE TABLE IF NOT EXISTS \"users\" (\n    \"id\" UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    \"username\" TEXT UNIQUE,\n    \"password\" TEXT NOT NULL,\n    \"admin\" BOOLEAN DEFAULT 'false'\n  )")];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, conn.any("CREATE TABLE IF NOT EXISTS \"databaseTemplates\" (\n    \"id\" UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    \"data\" JSONB DEFAULT '{}'\n  )")];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, conn.any("CREATE TABLE IF NOT EXISTS \"labs\" (\n    \"id\" UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    \"labNumber\" INTEGER UNIQUE,\n    \"dateTime\" TIMESTAMP NOT NULL\n  )")];
                case 6:
                    _c.sent();
                    return [4 /*yield*/, conn.any("CREATE TABLE IF NOT EXISTS \"questions\" (\n    \"id\" UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    \"question\" TEXT,\n    \"modelAnswer\" TEXT,\n    \"databaseId\" UUID REFERENCES \"databaseTemplates\"(\"id\"),\n    \"startingText\" TEXT,\n    \"response\" TEXT,\n    \"respondAfter\" INTEGER,\n    \"autoResponse\" BOOLEAN DEFAULT false\n  )")];
                case 7:
                    _c.sent();
                    return [4 /*yield*/, conn.any("CREATE TABLE IF NOT EXISTS \"answers\" (\n    \"id\" UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    \"userId\" UUID REFERENCES \"users\"(\"id\"),\n    \"questionId\" UUID REFERENCES \"questions\"(\"id\"),\n    \"history\" JSONB DEFAULT '[]',\n    \"activity\" JSONB DEFAULT '[]',\n    \"completed\" BOOLEAN DEFAULT false,\n    CONSTRAINT user_question_uniq UNIQUE (\"userId\", \"questionId\")\n    )")];
                case 8:
                    _c.sent();
                    return [4 /*yield*/, conn.any("CREATE TABLE IF NOT EXISTS \"labsQuestions\" (\n    \"id\" UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    \"labId\" UUID REFERENCES \"labs\"(\"id\"),\n    \"questionId\" UUID REFERENCES \"questions\"(\"id\")\n  )")];
                case 9:
                    _c.sent();
                    return [4 /*yield*/, conn.any("CREATE TABLE IF NOT EXISTS \"feedbacks\" (\n                  \"id\" UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n                  \"feedback\" TEXT,\n                  \"userId\" UUID REFERENCES \"users\"(\"id\"),\n                  \"dateTime\" TIMESTAMP NOT NULL\n                )")];
                case 10:
                    _c.sent();
                    return [4 /*yield*/, conn.any("CREATE TABLE IF NOT EXISTS \"bugReports\" (\n                  \"id\" UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n                  \"bugReport\" TEXT,\n                  \"userId\" UUID REFERENCES \"users\"(\"id\"),\n                  \"dateTime\" TIMESTAMP NOT NULL\n                )")
                        //////////////////////////////////
                        //////////////////////////////////
                        //////////////////////////////////
                        //////////////////////////////////
                        //////////////////////////////////
                        //////////////////////////////////
                        //////////////////////////////////
                        //////////////////////////////////
                        //////////////////////////////////
                    ];
                case 11:
                    _c.sent();
                    //////////////////////////////////
                    //////////////////////////////////
                    //////////////////////////////////
                    //////////////////////////////////
                    //////////////////////////////////
                    //////////////////////////////////
                    //////////////////////////////////
                    //////////////////////////////////
                    //////////////////////////////////
                    return [4 /*yield*/, conn.any("\n    INSERT INTO \"users\" (\"username\", \"password\", \"admin\")\n    VALUES\n      ('admin', crypt('pass123', gen_salt('bf')), true),\n      ('asd', crypt('pass123', gen_salt('bf')), false)\n  ")];
                case 12:
                    //////////////////////////////////
                    //////////////////////////////////
                    //////////////////////////////////
                    //////////////////////////////////
                    //////////////////////////////////
                    //////////////////////////////////
                    //////////////////////////////////
                    //////////////////////////////////
                    //////////////////////////////////
                    _c.sent();
                    return [4 /*yield*/, conn.any("\n    INSERT INTO \"databaseTemplates\" (\"data\")\n    VALUES (" + exports.pgp.as.json([{ name: "testDb", columns: [], data: [] }]) + ")\n    RETURNING \"id\"\n  ")];
                case 13:
                    databases = _c.sent();
                    _i = 0, labs_1 = seedQuestions_1.labs;
                    _c.label = 14;
                case 14:
                    if (!(_i < labs_1.length)) return [3 /*break*/, 21];
                    lab = labs_1[_i];
                    return [4 /*yield*/, conn.one("\n        INSERT INTO \"labs\" (\"labNumber\", \"dateTime\")\n        VALUES ('" + lab.labNumber + "', '" + lab.dataTime + "')\n        RETURNING \"id\"\n      ")];
                case 15:
                    labRecord = _c.sent();
                    _a = 0, _b = lab.questions;
                    _c.label = 16;
                case 16:
                    if (!(_a < _b.length)) return [3 /*break*/, 20];
                    questionData = _b[_a];
                    question = questionData.question, answer = questionData.answer, startingText = questionData.startingText, response = questionData.response, respondAfter = questionData.respondAfter, autoResponse = questionData.autoResponse;
                    values = [
                        question,
                        answer,
                        databases[0].id,
                        startingText,
                        response,
                        respondAfter,
                        autoResponse,
                    ]
                        .map(function (v) { return "'" + exports.pgp.as.value(v) + "'"; })
                        .join();
                    return [4 /*yield*/, conn.one("\n        INSERT INTO \"questions\" (\"question\",\"modelAnswer\",\"databaseId\",\"startingText\",\"response\",\"respondAfter\",\"autoResponse\")\n        VALUES (" + values + ")\n        RETURNING \"id\"\n      ")];
                case 17:
                    questionRecord = _c.sent();
                    return [4 /*yield*/, conn.any("\n        INSERT INTO \"labsQuestions\" (\"labId\", \"questionId\")\n        VALUES ('" + labRecord.id + "', '" + questionRecord.id + "')\n      ")];
                case 18:
                    _c.sent();
                    _c.label = 19;
                case 19:
                    _a++;
                    return [3 /*break*/, 16];
                case 20:
                    _i++;
                    return [3 /*break*/, 14];
                case 21: return [4 /*yield*/, conn.any("\n    INSERT INTO \"feedbacks\" (\"feedback\", \"dateTime\", \"userId\")\n    VALUES ('This is the feedback', now(), (SELECT id from \"users\" WHERE \"username\" = 'asd'))\n  ")];
                case 22:
                    _c.sent();
                    return [4 /*yield*/, conn.any("\n    INSERT INTO \"bugReports\" (\"bugReport\", \"dateTime\", \"userId\")\n    VALUES ('This is the bug report', now(), (SELECT id FROM \"users\" WHERE \"username\" = 'asd'))\n  ")];
                case 23:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
run();
