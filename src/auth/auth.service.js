"use strict";
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var crypto = require("crypto");
var rxjs_1 = require("rxjs");
var AuthService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(usersRepository, companiesRepository, jwtService, mailchimpService, httpService) {
            this.usersRepository = usersRepository;
            this.companiesRepository = companiesRepository;
            this.jwtService = jwtService;
            this.mailchimpService = mailchimpService;
            this.httpService = httpService;
            this.logger = new common_1.Logger(AuthService.name);
        }
        AuthService_1.prototype.signUp = function (signUpDto) {
            return __awaiter(this, void 0, void 0, function () {
                var firstName, lastName, email, password, _a, role, businessName, website, existingUser, hashedPassword, user, company, token, verificationUrl;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            firstName = signUpDto.firstName, lastName = signUpDto.lastName, email = signUpDto.email, password = signUpDto.password, _a = signUpDto.role, role = _a === void 0 ? 'buyer' : _a, businessName = signUpDto.businessName, website = signUpDto.website;
                            return [4 /*yield*/, this.usersRepository.findOne({
                                    where: { email: email },
                                })];
                        case 1:
                            existingUser = _b.sent();
                            if (existingUser) {
                                return [2 /*return*/, { message: 'Email already exists. Please use a different email.' }];
                            }
                            return [4 /*yield*/, bcrypt.hash(password, 10)];
                        case 2:
                            hashedPassword = _b.sent();
                            user = this.usersRepository.create({
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                password: hashedPassword,
                                role: role,
                            });
                            return [4 /*yield*/, this.usersRepository.save(user)];
                        case 3:
                            _b.sent();
                            if (!(role === 'seller')) return [3 /*break*/, 5];
                            company = this.companiesRepository.create({
                                userId: user.id, // Assuming you have a userId field in your companies table
                                businessName: businessName,
                                website: website,
                            });
                            return [4 /*yield*/, this.companiesRepository.save(company)];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5:
                            token = this.jwtService.sign({ userId: user.id, email: user.email, role: user.role }, { secret: process.env.JWT_SECRET, expiresIn: '1h' });
                            verificationUrl = "".concat(process.env.BACKEND_URL, "/auth/verify-email?token=").concat(token);
                            return [4 /*yield*/, this.mailchimpService.sendVerificationEmail(email, verificationUrl)];
                        case 6:
                            _b.sent();
                            return [2 /*return*/, {
                                    message: 'Registration successful. Please check your email to verify your account.',
                                    token: token,
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.login = function (loginDto) {
            return __awaiter(this, void 0, void 0, function () {
                var email, password, user, isPasswordMatched, accessToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            email = loginDto.email, password = loginDto.password;
                            return [4 /*yield*/, this.usersRepository.findOne({
                                    where: { email: email },
                                })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.UnauthorizedException('Invalid email or password');
                            }
                            return [4 /*yield*/, bcrypt.compare(password, user.password)];
                        case 2:
                            isPasswordMatched = _a.sent();
                            if (!isPasswordMatched) {
                                throw new common_1.UnauthorizedException('Invalid email or password');
                            }
                            accessToken = this.jwtService.sign({ userId: user.id, email: user.email }, { secret: process.env.JWT_SECRET, expiresIn: '1h' });
                            return [2 /*return*/, {
                                    accessToken: accessToken,
                                    user: {
                                        id: user.id,
                                        email: user.email,
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        role: user.role,
                                    },
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.googleLogin = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!req.user) {
                        return [2 /*return*/, 'No user from google'];
                    }
                    return [2 /*return*/, {
                            message: 'User Info from Google',
                            user: req.user,
                        }];
                });
            });
        };
        AuthService_1.prototype.oAuthLogin = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                var payload, jwt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!req.user) {
                                throw new Error('User not found!!!');
                            }
                            payload = {
                                email: req.user.email,
                                name: req.user.name,
                            };
                            return [4 /*yield*/, this.jwtService.sign(payload)];
                        case 1:
                            jwt = _a.sent();
                            return [2 /*return*/, { jwt: jwt }];
                    }
                });
            });
        };
        AuthService_1.prototype.generateVerificationToken = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                var payload;
                return __generator(this, function (_a) {
                    payload = { email: email };
                    return [2 /*return*/, this.jwtService.sign(payload, {
                            secret: process.env.JWT_SECRET,
                            expiresIn: '1h',
                        })];
                });
            });
        };
        AuthService_1.prototype.verifyToken = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.jwtService.verify(token, { secret: process.env.JWT_SECRET })];
                });
            });
        };
        AuthService_1.prototype.verifyEmail = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                var email, user, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            email = this.jwtService.verify(token).email;
                            return [4 /*yield*/, this.usersRepository.findOne({ where: { email: email } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new Error('User not found');
                            }
                            // Activate the user
                            user.isVerified = true;
                            return [4 /*yield*/, this.usersRepository.save(user)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 3:
                            error_1 = _a.sent();
                            this.logger.error("Email verification failed: ".concat(error_1.message));
                            return [2 /*return*/, false];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.requestPasswordReset = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                var user, token;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.usersRepository.findOne({ where: { email: email } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
                            }
                            token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
                                expiresIn: '1h',
                            });
                            return [4 /*yield*/, this.mailchimpService.sendPasswordResetEmail(user.email, token)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.generateResetToken = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                var user, token, expiry;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.usersRepository.findOne({ where: { email: email } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new Error('User not found');
                            }
                            token = crypto.randomBytes(32).toString('hex');
                            expiry = new Date();
                            expiry.setHours(expiry.getHours() + 1);
                            user.resetToken = token;
                            user.resetTokenExpiry = expiry;
                            return [4 /*yield*/, this.usersRepository.save(user)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.mailchimpService.sendPasswordResetEmail(email, token)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.revokeGoogleToken = function (accessToken) {
            return __awaiter(this, void 0, void 0, function () {
                var url, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = "https://oauth2.googleapis.com/revoke?token=".concat(accessToken);
                            return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.httpService.post(url))];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.data];
                    }
                });
            });
        };
        AuthService_1.prototype.resetPassword = function (token, newPassword) {
            return __awaiter(this, void 0, void 0, function () {
                var user, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.usersRepository.findOne({
                                where: { resetToken: token },
                            })];
                        case 1:
                            user = _b.sent();
                            if (!user || user.resetTokenExpiry < new Date()) {
                                throw new Error('Token is invalid or expired');
                            }
                            _a = user;
                            return [4 /*yield*/, bcrypt.hash(newPassword, 10)];
                        case 2:
                            _a.password = _b.sent();
                            user.resetToken = null;
                            user.resetTokenExpiry = null;
                            return [4 /*yield*/, this.usersRepository.save(user)];
                        case 3:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
exports.AuthService = AuthService;
