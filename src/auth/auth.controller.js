"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var google_oauth_guard_1 = require("./google-oauth.guard");
var AuthController = function () {
    var _classDecorators = [(0, common_1.Controller)('auth')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _signUp_decorators;
    var _verifyEmail_decorators;
    var _login_decorators;
    var _googleAuthCallback_decorators;
    var _googleAuth_decorators;
    var _googleAuthLogin_decorators;
    var _logout_decorators;
    var _facebookLogin_decorators;
    var _facebookLoginRedirect_decorators;
    var _githubAuth_decorators;
    var _githubAuthRedirect_decorators;
    var _appleAuth_decorators;
    var _appleAuthRedirect_decorators;
    var _forgotPassword_decorators;
    var _resetPassword_decorators;
    var _sendEmail_decorators;
    var AuthController = _classThis = /** @class */ (function () {
        function AuthController_1(authService, mailChimpService, jwtService) {
            this.authService = (__runInitializers(this, _instanceExtraInitializers), authService);
            this.mailChimpService = mailChimpService;
            this.jwtService = jwtService;
        }
        AuthController_1.prototype.signUp = function (signUpDto, res) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.signUp(signUpDto)];
                        case 1:
                            result = _a.sent();
                            if (result.token) {
                                return [2 /*return*/, res.status(common_1.HttpStatus.CREATED).json(result)];
                            }
                            else {
                                return [2 /*return*/, res.status(common_1.HttpStatus.CONFLICT).json(result)];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        AuthController_1.prototype.verifyEmail = function (token, res) {
            return __awaiter(this, void 0, void 0, function () {
                var role, redirectUrl, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            role = this.jwtService.verify(token).role;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.authService.verifyEmail(token)];
                        case 2:
                            _a.sent();
                            redirectUrl = void 0;
                            if (role === 'seller') {
                                redirectUrl = "".concat(process.env.FRONTEND_URL, "/vendor/dashboard");
                            }
                            else {
                                redirectUrl = "".concat(process.env.FRONTEND_URL, "/marketplace");
                            }
                            return [2 /*return*/, res.redirect(redirectUrl)];
                        case 3:
                            error_1 = _a.sent();
                            return [2 /*return*/, res.redirect("".concat(process.env.FRONTEND_URL, "/email-verification-failed"))];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        AuthController_1.prototype.login = function (loginDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.login(loginDto)];
                });
            });
        };
        AuthController_1.prototype.googleAuthCallback = function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var token, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.authService.oAuthLogin(req)];
                        case 1:
                            token = _a.sent();
                            res.status(200).send({ success: true, message: token.jwt });
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _a.sent();
                            res.status(500).send({ success: false, message: err_1.message });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AuthController_1.prototype.googleAuth = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Google OAuth2 login process
                    console.log(req);
                    return [2 /*return*/];
                });
            });
        };
        AuthController_1.prototype.googleAuthLogin = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Google OAuth2 login process
                    console.log(req);
                    return [2 /*return*/];
                });
            });
        };
        AuthController_1.prototype.logout = function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(req.user && req.user.accessToken)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.authService.revokeGoogleToken(req.user.accessToken)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        AuthController_1.prototype.facebookLogin = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, common_1.HttpStatus.OK];
                });
            });
        };
        AuthController_1.prototype.facebookLoginRedirect = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, {
                            statusCode: common_1.HttpStatus.OK,
                            data: req.user,
                        }];
                });
            });
        };
        AuthController_1.prototype.githubAuth = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        AuthController_1.prototype.githubAuthRedirect = function (req, res) {
            var _a = req.user, user = _a.user, accessToken = _a.accessToken;
            var frontendRedirectUrl = "".concat(process.env.FRONTEND_URL, "/auth/callback?user=").concat(encodeURIComponent(JSON.stringify(user)), "&accessToken=").concat(accessToken);
            return res.redirect(frontendRedirectUrl);
        };
        AuthController_1.prototype.appleAuth = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        AuthController_1.prototype.appleAuthRedirect = function (req, res) {
            var _a = req.user, user = _a.user, accessToken = _a.accessToken;
            // const accessToken = user.accessToken;
            var frontendRedirectUrl = "".concat(process.env.FRONTEND_URL, "/auth/callback?user=").concat(encodeURIComponent(JSON.stringify(user)), "&accessToken=").concat(accessToken);
            return res.redirect(frontendRedirectUrl);
        };
        AuthController_1.prototype.forgotPassword = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                var error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.authService.generateResetToken(email)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, {
                                    message: 'Password reset url has been sent to your email',
                                }];
                        case 2:
                            error_2 = _a.sent();
                            throw new common_1.BadRequestException(error_2.message);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AuthController_1.prototype.resetPassword = function (token, newPassword) {
            return __awaiter(this, void 0, void 0, function () {
                var error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.authService.resetPassword(token, newPassword)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, {
                                    message: 'Password reset successful!',
                                }];
                        case 2:
                            error_3 = _a.sent();
                            throw new common_1.BadRequestException(error_3.message);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AuthController_1.prototype.sendEmail = function (email, verificationUrl) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.mailChimpService.sendEmail(email, verificationUrl)];
                });
            });
        };
        return AuthController_1;
    }());
    __setFunctionName(_classThis, "AuthController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _signUp_decorators = [(0, common_1.Post)('signup')];
        _verifyEmail_decorators = [(0, common_1.Get)('verify-email')];
        _login_decorators = [(0, common_1.Post)('login'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _googleAuthCallback_decorators = [(0, common_1.Get)('/callback/google'), (0, common_1.UseGuards)(google_oauth_guard_1.GoogleOauthGuard)];
        _googleAuth_decorators = [(0, common_1.Get)('google-signup'), (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google'))];
        _googleAuthLogin_decorators = [(0, common_1.Get)('google-login'), (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google'))];
        _logout_decorators = [(0, common_1.Get)('logout')];
        _facebookLogin_decorators = [(0, common_1.Get)('/facebook'), (0, common_1.UseGuards)((0, passport_1.AuthGuard)('facebook'))];
        _facebookLoginRedirect_decorators = [(0, common_1.Get)('/callback/facebook'), (0, common_1.UseGuards)((0, passport_1.AuthGuard)('facebook'))];
        _githubAuth_decorators = [(0, common_1.Get)('github'), (0, common_1.UseGuards)((0, passport_1.AuthGuard)('github'))];
        _githubAuthRedirect_decorators = [(0, common_1.Get)('callback/github'), (0, common_1.UseGuards)((0, passport_1.AuthGuard)('github'))];
        _appleAuth_decorators = [(0, common_1.Get)('apple'), (0, common_1.UseGuards)((0, passport_1.AuthGuard)('apple'))];
        _appleAuthRedirect_decorators = [(0, common_1.Get)('/callback/apple'), (0, common_1.UseGuards)((0, passport_1.AuthGuard)('apple'))];
        _forgotPassword_decorators = [(0, common_1.Post)('forgot-password')];
        _resetPassword_decorators = [(0, common_1.Post)('reset-password')];
        _sendEmail_decorators = [(0, common_1.Post)('/send-email')];
        __esDecorate(_classThis, null, _signUp_decorators, { kind: "method", name: "signUp", static: false, private: false, access: { has: function (obj) { return "signUp" in obj; }, get: function (obj) { return obj.signUp; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyEmail_decorators, { kind: "method", name: "verifyEmail", static: false, private: false, access: { has: function (obj) { return "verifyEmail" in obj; }, get: function (obj) { return obj.verifyEmail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _login_decorators, { kind: "method", name: "login", static: false, private: false, access: { has: function (obj) { return "login" in obj; }, get: function (obj) { return obj.login; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _googleAuthCallback_decorators, { kind: "method", name: "googleAuthCallback", static: false, private: false, access: { has: function (obj) { return "googleAuthCallback" in obj; }, get: function (obj) { return obj.googleAuthCallback; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _googleAuth_decorators, { kind: "method", name: "googleAuth", static: false, private: false, access: { has: function (obj) { return "googleAuth" in obj; }, get: function (obj) { return obj.googleAuth; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _googleAuthLogin_decorators, { kind: "method", name: "googleAuthLogin", static: false, private: false, access: { has: function (obj) { return "googleAuthLogin" in obj; }, get: function (obj) { return obj.googleAuthLogin; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _logout_decorators, { kind: "method", name: "logout", static: false, private: false, access: { has: function (obj) { return "logout" in obj; }, get: function (obj) { return obj.logout; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _facebookLogin_decorators, { kind: "method", name: "facebookLogin", static: false, private: false, access: { has: function (obj) { return "facebookLogin" in obj; }, get: function (obj) { return obj.facebookLogin; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _facebookLoginRedirect_decorators, { kind: "method", name: "facebookLoginRedirect", static: false, private: false, access: { has: function (obj) { return "facebookLoginRedirect" in obj; }, get: function (obj) { return obj.facebookLoginRedirect; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _githubAuth_decorators, { kind: "method", name: "githubAuth", static: false, private: false, access: { has: function (obj) { return "githubAuth" in obj; }, get: function (obj) { return obj.githubAuth; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _githubAuthRedirect_decorators, { kind: "method", name: "githubAuthRedirect", static: false, private: false, access: { has: function (obj) { return "githubAuthRedirect" in obj; }, get: function (obj) { return obj.githubAuthRedirect; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _appleAuth_decorators, { kind: "method", name: "appleAuth", static: false, private: false, access: { has: function (obj) { return "appleAuth" in obj; }, get: function (obj) { return obj.appleAuth; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _appleAuthRedirect_decorators, { kind: "method", name: "appleAuthRedirect", static: false, private: false, access: { has: function (obj) { return "appleAuthRedirect" in obj; }, get: function (obj) { return obj.appleAuthRedirect; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _forgotPassword_decorators, { kind: "method", name: "forgotPassword", static: false, private: false, access: { has: function (obj) { return "forgotPassword" in obj; }, get: function (obj) { return obj.forgotPassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resetPassword_decorators, { kind: "method", name: "resetPassword", static: false, private: false, access: { has: function (obj) { return "resetPassword" in obj; }, get: function (obj) { return obj.resetPassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _sendEmail_decorators, { kind: "method", name: "sendEmail", static: false, private: false, access: { has: function (obj) { return "sendEmail" in obj; }, get: function (obj) { return obj.sendEmail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthController = _classThis;
}();
exports.AuthController = AuthController;
