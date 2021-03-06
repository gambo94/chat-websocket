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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var User_1 = require("../entity/User");
var Message_1 = require("../entity/Message");
var Session_1 = require("../entity/Session");
var typeorm_1 = require("typeorm");
var dataConverter = require('../helpers/dateConversion');
var signupUser = function (user) { return __awaiter(_this, void 0, void 0, function () {
    var userRepo, userCreated;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userRepo = typeorm_1.getRepository(User_1.User);
                userCreated = userRepo.create(user);
                return [4 /*yield*/, userRepo.save(userCreated)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var userExists = function (username, password) { return __awaiter(_this, void 0, void 0, function () {
    var exists;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User)
                    .query("\n        SELECT username, room, password \n        FROM user\n        WHERE username='" + username + "'\n        AND password = '" + password + "'\n    ")];
            case 1:
                exists = _a.sent();
                return [2 /*return*/, exists];
        }
    });
}); };
var logUser = function (user) { return __awaiter(_this, void 0, void 0, function () {
    var name, pwd, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = user.username;
                pwd = user.password;
                console.log('from service', name);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User)
                        .createQueryBuilder()
                        .where('user.username = :username', { username: name })
                        .andWhere('user.password = :password', { password: pwd })
                        .getOne()];
            case 1:
                result = _a.sent();
                console.log('loguser', result);
                return [2 /*return*/];
        }
    });
}); };
var userAuth = function (username, password) { return __awaiter(_this, void 0, void 0, function () {
    var existsUsername, existsPwd;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User)
                    .query("\n        SELECT username, password \n        FROM user\n        WHERE username='" + username + "'\n    ")];
            case 1:
                existsUsername = _a.sent();
                if (existsUsername === undefined || existsUsername.length === 0) {
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User)
                        .query("\n        SELECT username, password \n        FROM user\n        WHERE password='" + password + "'\n    ")];
            case 2:
                existsPwd = _a.sent();
                if (existsPwd === undefined || existsPwd.length === 0) {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/, true];
        }
    });
}); };
var saveChatMessage = function (chatObj) { return __awaiter(_this, void 0, void 0, function () {
    var msgRepo, msgCreated;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                msgRepo = typeorm_1.getRepository(Message_1.Message);
                msgCreated = msgRepo.create(chatObj);
                return [4 /*yield*/, msgRepo.save(msgCreated)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getMessages = function (room) { return __awaiter(_this, void 0, void 0, function () {
    var msgs, dateToString;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Message_1.Message)
                    .query("\n        SELECT id, username, message_content, room, message_date\n        FROM message\n        WHERE room = '" + room + "'\n        ORDER BY message_date;\n    ")];
            case 1:
                msgs = _a.sent();
                return [4 /*yield*/, dataConverter(msgs)];
            case 2:
                dateToString = _a.sent();
                return [2 /*return*/, dateToString];
        }
    });
}); };
var newSession = function (session) { return __awaiter(_this, void 0, void 0, function () {
    var sessionRepo, sessionCreated;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sessionRepo = typeorm_1.getRepository(Session_1.Session);
                sessionCreated = sessionRepo.create(session);
                return [4 /*yield*/, sessionRepo.save(sessionCreated)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var deleteSession = function (username, room) { return __awaiter(_this, void 0, void 0, function () {
    var deleteSession;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Session_1.Session)
                    .query("\n        DELETE FROM session\n        WHERE username = '" + username + "'\n        AND room = '" + room + "'\n    ")];
            case 1:
                deleteSession = _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getSessions = function (room) { return __awaiter(_this, void 0, void 0, function () {
    var sessions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Session_1.Session)
                    .query("\n        SELECT username, room\n        FROM session\n        WHERE room = '" + room + "'\n    ")];
            case 1:
                sessions = _a.sent();
                return [2 /*return*/, sessions];
        }
    });
}); };
module.exports = { userExists: userExists, signupUser: signupUser, logUser: logUser, userAuth: userAuth,
    saveChatMessage: saveChatMessage, getMessages: getMessages, newSession: newSession, deleteSession: deleteSession, getSessions: getSessions };
//# sourceMappingURL=service.js.map