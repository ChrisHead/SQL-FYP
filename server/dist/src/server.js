"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
// load variables from the .env file and add them to process.env.XXX
require("dotenv").config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var config_1 = require("./config");
var morgan_1 = __importDefault(require("morgan"));
var jwt = __importStar(require("jsonwebtoken"));
var middleware_1 = require("./middleware");
var conn = config_1.pgp(config_1.db);
// create app
var app = express_1.default();
// security stuff. see google
app.use(cors_1.default());
// parse json body
app.use(express_1.default.json());
// log requests
app.use(morgan_1.default("dev"));
var addApiEndpoint = middleware_1.createAddApiEndpoint(app, conn);
addApiEndpoint("login", {}, function (_a) {
    var req = _a.req;
    return __awaiter(_this, void 0, void 0, function () {
        var _b, username, password, sql, results, user, authToken;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = req.body, username = _b.username, password = _b.password;
                    sql = "\n  SELECT *\n  FROM \"users\"\n  WHERE \"username\"='" + config_1.pgp.as.value(username) + "'\n  AND \"password\"=crypt('" + config_1.pgp.as.value(password) + "', \"password\")\n  ";
                    return [4 /*yield*/, conn.any(sql)];
                case 1:
                    results = _c.sent();
                    if (results.length !== 1) {
                        return [2 /*return*/, { error: "no one found!!!! :(" }];
                    }
                    user = results[0];
                    authToken = jwt.sign({ id: user.id }, config_1.secretKey);
                    return [4 /*yield*/, addActivity(user, "Login")];
                case 2:
                    _c.sent();
                    return [2 /*return*/, { data: { authToken: authToken } }];
            }
        });
    });
});
addApiEndpoint("currentUser", { permission: "authenticated" }, function (_a) {
    var currentUser = _a.currentUser, req = _a.req, res = _a.res, next = _a.next;
    return __awaiter(_this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_b) {
            data = { username: currentUser.username, admin: currentUser.admin };
            return [2 /*return*/, data];
        });
    });
});
addApiEndpoint("users", { permission: "admin" }, function () { return __awaiter(_this, void 0, void 0, function () {
    var sql, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n  SELECT id, username, admin, activity\n  FROM \"users\"\n  ";
                return [4 /*yield*/, conn.any(sql)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, results];
        }
    });
}); });
addApiEndpoint("studentLabs", { permission: "authenticated" }, function (_a) {
    var currentUser = _a.currentUser;
    return __awaiter(_this, void 0, void 0, function () {
        var sql, results;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    sql = "\n  SELECT\n    \"labs\".*,\n    ((\n      SELECT json_agg(\"questions\".*)\n      FROM (\n        SELECT\n          *,\n          (SELECT row_to_json(\"answers\".*) FROM (\n            SELECT * FROM \"answers\" WHERE \"questionId\" = \"questions\".\"id\" AND \"userId\"='" + currentUser.id + "'\n          ) \"answers\") \"answer\"\n        FROM \"questions\"\n        WHERE \"id\" IN (SELECT \"questionId\" FROM \"labsQuestions\" WHERE \"labId\"=\"labs\".\"id\" )\n          ) \"questions\"\n    )) questions\n  FROM \"labs\"\n  ";
                    return [4 /*yield*/, conn.any(sql)];
                case 1:
                    results = _b.sent();
                    return [2 /*return*/, results];
            }
        });
    });
});
addApiEndpoint("questions", { permission: "admin" }, function () { return __awaiter(_this, void 0, void 0, function () {
    var sql, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sql = "\n  SELECT *\n  FROM questions\n  ";
                return [4 /*yield*/, conn.any(sql)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, results];
        }
    });
}); });
addApiEndpoint("feedback", { permission: "authenticated" }, function (_a) {
    var currentUser = _a.currentUser, req = _a.req;
    return __awaiter(_this, void 0, void 0, function () {
        var data, sql, feedback;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    data = req.body;
                    sql = "\n    INSERT INTO \"feedbacks\" (\"feedback\", \"userId\", \"dateTime\")\n    VALUES ('" + config_1.pgp.as.value(data.data) + "', '" + currentUser.id + "', now()) RETURNING \"id\"\n    ";
                    return [4 /*yield*/, conn.any(sql)];
                case 1:
                    feedback = _b.sent();
                    return [2 /*return*/, feedback];
            }
        });
    });
});
addApiEndpoint("bugReport", { permission: "authenticated" }, function (_a) {
    var currentUser = _a.currentUser, req = _a.req;
    return __awaiter(_this, void 0, void 0, function () {
        var data, sql, bugReport;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    data = req.body;
                    sql = "\n    INSERT INTO \"bugReports\" (\"bugReport\", \"userId\", \"dateTime\")\n    VALUES ('" + config_1.pgp.as.value(data.data) + "', '" + currentUser.id + "', now()) RETURNING \"id\"\n    ";
                    return [4 /*yield*/, conn.any(sql)];
                case 1:
                    bugReport = _b.sent();
                    return [2 /*return*/, bugReport];
            }
        });
    });
});
addApiEndpoint("updateHistory", { permission: "authenticated" }, function (_a) {
    var currentUser = _a.currentUser, req = _a.req, res = _a.res, next = _a.next;
    return __awaiter(_this, void 0, void 0, function () {
        var _b, questionId, history, sql, answerRecord, historyItem, updateHistorySql, updateHistory;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = req.body.data, questionId = _b.questionId, history = _b.history;
                    sql = "\n      INSERT INTO \"answers\" (\"userId\", \"questionId\")\n      VALUES ('" + currentUser.id + "', '" + config_1.pgp.as.value(questionId) + "')\n      ON CONFLICT (\"userId\", \"questionId\") DO UPDATE SET \"userId\"=EXCLUDED.\"userId\"\n      RETURNING \"id\"\n    ";
                    return [4 /*yield*/, conn.one(sql)];
                case 1:
                    answerRecord = _c.sent();
                    historyItem = __assign({}, history, { dateTime: Date() });
                    updateHistorySql = "\n      UPDATE answers\n      SET \"history\" = \"history\" || " + config_1.pgp.as.json([historyItem]) + "\n      WHERE \"id\" = '" + config_1.pgp.as.value(answerRecord.id) + "'\n      RETURNING \"history\"\n    ";
                    return [4 /*yield*/, conn.one(updateHistorySql)];
                case 2:
                    updateHistory = _c.sent();
                    return [2 /*return*/, updateHistory];
            }
        });
    });
});
addApiEndpoint("updateCompleted", { permission: "authenticated" }, function (_a) {
    var currentUser = _a.currentUser, req = _a.req;
    return __awaiter(_this, void 0, void 0, function () {
        var questionId, sql, updateCompleted;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    questionId = req.body.data.questionId;
                    sql = "\n    UPDATE answers\n    SET \"completed\" = true\n    WHERE \"userId\" = '" + config_1.pgp.as.value(currentUser.id) + "'\n    AND \"questionId\" = '" + config_1.pgp.as.value(questionId) + "'\n    ";
                    return [4 /*yield*/, conn.any(sql)];
                case 1:
                    updateCompleted = _b.sent();
                    return [2 /*return*/, updateCompleted];
            }
        });
    });
});
addApiEndpoint("updateQuestion", { permission: "admin" }, function (_a) {
    var currentUser = _a.currentUser, req = _a.req;
    return __awaiter(_this, void 0, void 0, function () {
        var questionId, question, modelAnswer, databaseId, startingText, sql, updateQuestion;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    questionId = req.body.data.updatedQuestion.id;
                    question = req.body.data.updatedQuestion.question;
                    modelAnswer = req.body.data.updatedQuestion.modelAnswer;
                    databaseId = req.body.data.updatedQuestion.databaseId;
                    startingText = req.body.data.updatedQuestion.startingText;
                    sql = "\n      UPDATE questions\n      SET\n      \"question\" = '" + config_1.pgp.as.value(question) + "',\n      \"modelAnswer\" = '" + config_1.pgp.as.value(modelAnswer) + "',\n      \"databaseId\" = '" + config_1.pgp.as.value(databaseId) + "',\n      \"startingText\" = '" + config_1.pgp.as.value(startingText) + "'\n      WHERE \"id\" = '" + config_1.pgp.as.value(questionId) + "'\n    ";
                    return [4 /*yield*/, conn.any(sql)];
                case 1:
                    updateQuestion = _b.sent();
                    return [2 /*return*/, updateQuestion];
            }
        });
    });
});
addApiEndpoint("addQuestion", { permission: "admin" }, function (_a) {
    var currentUser = _a.currentUser, req = _a.req;
    return __awaiter(_this, void 0, void 0, function () {
        var question, modelAnswer, databaseId, startingText, sql, addQuestion;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    question = req.body.data.addedQuestion.question;
                    modelAnswer = req.body.data.addedQuestion.modelAnswer;
                    databaseId = req.body.data.addedQuestion.databaseId;
                    startingText = req.body.data.addedQuestion.startingText;
                    sql = "\n      INSERT INTO\n      questions (\"question\",\"modelAnswer\",\"databaseId\",\"startingText\")\n      VALUES\n      ('" + config_1.pgp.as.value(question) + "',\n      '" + config_1.pgp.as.value(modelAnswer) + "',\n      '" + config_1.pgp.as.value(databaseId) + "',\n      '" + config_1.pgp.as.value(startingText) + "')\n    ";
                    return [4 /*yield*/, conn.any(sql)];
                case 1:
                    addQuestion = _b.sent();
                    return [2 /*return*/, addQuestion];
            }
        });
    });
});
addApiEndpoint("updateActivity", { permission: "authenticated" }, function (_a) {
    var currentUser = _a.currentUser, req = _a.req;
    return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, addActivity(currentUser, req.body.data.activity)];
        });
    });
});
addApiEndpoint("addUser", { permission: "admin" }, function (_a) {
    var currentUser = _a.currentUser, req = _a.req;
    return __awaiter(_this, void 0, void 0, function () {
        var username, password, admin, sql, addQuestion;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    username = req.body.data.addedUser.username;
                    password = req.body.data.addedUser.password;
                    admin = req.body.data.addedUser.admin;
                    sql = "\n      INSERT INTO\n      users (\"username\",\"password\",\"admin\")\n      VALUES\n      ('" + config_1.pgp.as.value(username) + "',\n      crypt('" + config_1.pgp.as.value(password) + "', gen_salt('bf')),\n      '" + config_1.pgp.as.value(admin) + "')\n    ";
                    return [4 /*yield*/, conn.any(sql)];
                case 1:
                    addQuestion = _b.sent();
                    return [2 /*return*/, addQuestion];
            }
        });
    });
});
addApiEndpoint("updateUser", { permission: "admin" }, function (_a) {
    var currentUser = _a.currentUser, req = _a.req;
    return __awaiter(_this, void 0, void 0, function () {
        var userId, username, password, sql, updateUser;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = req.body.data.updatedUser.id;
                    username = req.body.data.updatedUser.username;
                    password = req.body.data.updatedUser.password;
                    sql = "\n      UPDATE users\n      SET\n      \"username\" = '" + config_1.pgp.as.value(username) + "',\n      \"password\" = crypt('" + config_1.pgp.as.value(password) + "', gen_salt('bf'))\n      WHERE \"id\" = '" + config_1.pgp.as.value(userId) + "'\n    ";
                    return [4 /*yield*/, conn.any(sql)];
                case 1:
                    updateUser = _b.sent();
                    return [2 /*return*/, updateUser];
            }
        });
    });
});
addApiEndpoint("addLab", { permission: "admin" }, function (_a) {
    var currentUser = _a.currentUser, req = _a.req;
    return __awaiter(_this, void 0, void 0, function () {
        var labNumber, sql, addLab;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labNumber = req.body.data.addedLab.labNumber;
                    sql = "\n      INSERT INTO\n      labs (\"labNumber\",\"dateTime\")\n      VALUES\n      ('" + config_1.pgp.as.value(labNumber) + "',\n      now())\n    ";
                    return [4 /*yield*/, conn.any(sql)];
                case 1:
                    addLab = _b.sent();
                    return [2 /*return*/, addLab];
            }
        });
    });
});
function addActivity(user, activity) {
    return __awaiter(this, void 0, void 0, function () {
        var updateActivitySql, updateActivity;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updateActivitySql = "\n    UPDATE users\n    SET \"activity\" = \"activity\" || " + config_1.pgp.as.json([
                        { dateTime: Date(), activity: activity },
                    ]) + "\n    WHERE \"id\" = '" + config_1.pgp.as.value(user.id) + "'\n    RETURNING \"activity\"\n  ";
                    return [4 /*yield*/, conn.one(updateActivitySql)];
                case 1:
                    updateActivity = _a.sent();
                    return [2 /*return*/, updateActivity];
            }
        });
    });
}
// default response is 404
app.use(function (req, res, next) { return next(404); });
// handle errors by returning them as json
app.use(function (err, _req, res, _next) {
    console.error(err);
    if (err instanceof Error) {
        res.send({ error: err.message });
    }
    else {
        res.send({ error: err });
    }
});
var port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log("the server is listening at http://localhost:" + port);
});
// const errors =  {
//   pageNotFound: '404 not found',
//   recordNotFound: 'couldnt find a record'
// }
