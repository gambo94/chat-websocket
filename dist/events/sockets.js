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
var msgToObj = require('../utils/message');
var control = require('../controller/controller');
module.exports = function (io) {
    // events
    io.on('connection', function (socket) {
        // signupUser
        socket.on('signup', function (userAndPwd, cb) { return __awaiter(_this, void 0, void 0, function () {
            var userCreated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, control.signup_user(userAndPwd)];
                    case 1:
                        userCreated = _a.sent();
                        if (userCreated.username === userAndPwd.username && userCreated.password === userAndPwd.password) {
                            return [2 /*return*/, cb(true)];
                        }
                        else {
                            return [2 /*return*/, cb(false)];
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        // New user event
        socket.on('login', function (userObj, cb) { return __awaiter(_this, void 0, void 0, function () {
            var username, password, room, authenticatedUser, users, msgs;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = userObj.username;
                        password = userObj.password;
                        room = userObj.room;
                        return [4 /*yield*/, control.authUser(username, password)];
                    case 1:
                        authenticatedUser = _a.sent();
                        console.log('from socket auth', authenticatedUser);
                        if (authenticatedUser === false) {
                            return [2 /*return*/, cb(false)];
                        }
                        cb(true);
                        socket.username = username;
                        // creates session and storing into DB
                        return [4 /*yield*/, control.insert_session(room, username)];
                    case 2:
                        // creates session and storing into DB
                        _a.sent();
                        console.log('insert funziona');
                        // creates room
                        socket.join(room);
                        return [4 /*yield*/, control.get_sessions(room)];
                    case 3:
                        users = _a.sent();
                        io.to(room).emit('loadUsers', users);
                        return [4 /*yield*/, control.get_messages(room)];
                    case 4:
                        msgs = _a.sent();
                        socket.emit('conversation', msgs);
                        // Welcome current user (Sends a message to the single client)
                        socket.emit('message', msgToObj('Bot', "Welcome to the chat, " + socket.username));
                        // Broadcast when a user connects (notifies everybody but the not the current client)
                        socket.broadcast.to(room).emit('message', msgToObj('Bot', username + " has joined the chat"));
                        // Listen for chatMessage
                        socket.on('chatMessage', function (msg) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, control.saveChatMessage(room, socket.username, msg)];
                                    case 1:
                                        result = _a.sent();
                                        // emits to everybody
                                        io.to(room).emit('message', msgToObj(socket.username, msg));
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        // Runs when client disconnects, notifies all clients
                        socket.on('disconnect', function (data) { return __awaiter(_this, void 0, void 0, function () {
                            var usersSession;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!socket.username)
                                            return [2 /*return*/];
                                        io.to(room).emit('message', msgToObj('Bot', username + " has left the chat"));
                                        // removing user from sessions table
                                        return [4 /*yield*/, control.remove_session(username, room)];
                                    case 1:
                                        // removing user from sessions table
                                        _a.sent();
                                        return [4 /*yield*/, control.get_sessions(room)];
                                    case 2:
                                        usersSession = _a.sent();
                                        io.to(room).emit('displayDisconnect', usersSession);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        }); });
    });
};
//# sourceMappingURL=sockets.js.map