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
if (process.env.NODE_ENV !== "production")
    require("dotenv").config();
var pg_promise_1 = __importDefault(require("pg-promise"));
var config_1 = require("../src/config");
var seedQuestions_1 = require("./seedQuestions");
var seedUsers_1 = require("./seedUsers");
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
        var _i, users_1, user, userRecord, databases, _a, labs_1, lab, labRecord, _b, _c, questionData, question, modelAnswer, startingText, values, questionRecord;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, conn.any("DROP SCHEMA \"public\" CASCADE")];
                case 1:
                    _d.sent();
                    return [4 /*yield*/, conn.any("CREATE SCHEMA \"public\"")];
                case 2:
                    _d.sent();
                    return [4 /*yield*/, conn.any("CREATE EXTENSION IF NOT EXISTS \"pgcrypto\"")];
                case 3:
                    _d.sent();
                    return [4 /*yield*/, conn.any("CREATE TABLE IF NOT EXISTS \"users\" (\n    \"id\" UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    \"username\" TEXT UNIQUE,\n    \"password\" TEXT NOT NULL,\n    \"admin\" BOOLEAN DEFAULT 'false',\n    \"activity\" JSONB DEFAULT '[]'\n  )")];
                case 4:
                    _d.sent();
                    return [4 /*yield*/, conn.any("CREATE TABLE IF NOT EXISTS \"databaseTemplates\" (\n    \"id\" UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    \"data\" JSONB DEFAULT '[]'\n  )")];
                case 5:
                    _d.sent();
                    return [4 /*yield*/, conn.any("CREATE TABLE IF NOT EXISTS \"labs\" (\n    \"id\" UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    \"labNumber\" INTEGER UNIQUE,\n    \"dateTime\" TIMESTAMP NOT NULL\n  )")];
                case 6:
                    _d.sent();
                    return [4 /*yield*/, conn.any("CREATE TABLE IF NOT EXISTS \"questions\" (\n    \"id\" UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    \"question\" TEXT,\n    \"modelAnswer\" TEXT,\n    \"databaseId\" UUID REFERENCES \"databaseTemplates\"(\"id\"),\n    \"startingText\" TEXT,\n    \"questionNum\" INTEGER\n  )")];
                case 7:
                    _d.sent();
                    return [4 /*yield*/, conn.any("CREATE TABLE IF NOT EXISTS \"answers\" (\n    \"id\" UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    \"userId\" UUID REFERENCES \"users\"(\"id\"),\n    \"questionId\" UUID REFERENCES \"questions\"(\"id\"),\n    \"history\" JSONB DEFAULT '[]',\n    \"completed\" BOOLEAN DEFAULT false,\n    CONSTRAINT user_question_uniq UNIQUE (\"userId\", \"questionId\")\n    )")];
                case 8:
                    _d.sent();
                    return [4 /*yield*/, conn.any("CREATE TABLE IF NOT EXISTS \"labsQuestions\" (\n    \"id\" UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    \"labId\" UUID REFERENCES \"labs\"(\"id\"),\n    \"questionId\" UUID REFERENCES \"questions\"(\"id\")\n  )")];
                case 9:
                    _d.sent();
                    return [4 /*yield*/, conn.any("CREATE TABLE IF NOT EXISTS \"feedbacks\" (\n                  \"id\" UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n                  \"qOne\" TEXT,\n                  \"qTwo\" TEXT,\n                  \"qThree\" TEXT,\n                  \"comments\" TEXT,\n                  \"userId\" UUID REFERENCES \"users\"(\"id\"),\n                  \"dateTime\" TIMESTAMP NOT NULL\n                )")];
                case 10:
                    _d.sent();
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
                    _d.sent();
                    //////////////////////////////////
                    //////////////////////////////////
                    //////////////////////////////////
                    //////////////////////////////////
                    //////////////////////////////////
                    //////////////////////////////////
                    //////////////////////////////////
                    //////////////////////////////////
                    //////////////////////////////////
                    return [4 /*yield*/, conn.any("\n    INSERT INTO \"users\" (\"username\", \"password\", \"admin\")\n    VALUES\n      ('admin', crypt('coa201', gen_salt('bf')), true),\n      ('asd', crypt('test', gen_salt('bf')), false)\n  ")];
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
                    _d.sent();
                    _i = 0, users_1 = seedUsers_1.users;
                    _d.label = 13;
                case 13:
                    if (!(_i < users_1.length)) return [3 /*break*/, 16];
                    user = users_1[_i];
                    return [4 /*yield*/, conn.any("\n    INSERT INTO \"users\" (\"username\", \"password\", \"admin\")\n    VALUES\n      ('" + user.username + "',\n      crypt('" + user.password + "', gen_salt('bf')),\n      " + user.admin + ")\n    ")];
                case 14:
                    userRecord = _d.sent();
                    _d.label = 15;
                case 15:
                    _i++;
                    return [3 /*break*/, 13];
                case 16: return [4 /*yield*/, conn.any("\n    INSERT INTO \"databaseTemplates\" (\"data\")\n    VALUES (" + exports.pgp.as.json([{ name: "testDb", columns: [], data: [] }]) + ")\n    RETURNING \"id\"\n  ")];
                case 17:
                    databases = _d.sent();
                    _a = 0, labs_1 = seedQuestions_1.labs;
                    _d.label = 18;
                case 18:
                    if (!(_a < labs_1.length)) return [3 /*break*/, 25];
                    lab = labs_1[_a];
                    return [4 /*yield*/, conn.one("\n        INSERT INTO \"labs\" (\"labNumber\", \"dateTime\")\n        VALUES ('" + lab.labNumber + "', '" + lab.dataTime + "')\n        RETURNING \"id\"\n      ")];
                case 19:
                    labRecord = _d.sent();
                    _b = 0, _c = lab.questions;
                    _d.label = 20;
                case 20:
                    if (!(_b < _c.length)) return [3 /*break*/, 24];
                    questionData = _c[_b];
                    question = questionData.question, modelAnswer = questionData.modelAnswer, startingText = questionData.startingText;
                    values = [question, modelAnswer, databases[0].id, startingText]
                        .map(function (v) { return "'" + exports.pgp.as.value(v) + "'"; })
                        .join();
                    return [4 /*yield*/, conn.one("\n        INSERT INTO \"questions\" (\"question\",\"modelAnswer\",\"databaseId\",\"startingText\")\n        VALUES (" + values + ")\n        RETURNING \"id\"\n      ")];
                case 21:
                    questionRecord = _d.sent();
                    return [4 /*yield*/, conn.any("\n        INSERT INTO \"labsQuestions\" (\"labId\", \"questionId\")\n        VALUES ('" + labRecord.id + "', '" + questionRecord.id + "')\n      ")];
                case 22:
                    _d.sent();
                    _d.label = 23;
                case 23:
                    _b++;
                    return [3 /*break*/, 20];
                case 24:
                    _a++;
                    return [3 /*break*/, 18];
                case 25: return [2 /*return*/];
            }
        });
    });
}
run();
