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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var user_entity_1 = require("../users/entities/user.entity");
var company_entity_1 = require("../companies/entities/company.entity"); // Import the Company entity
var typeorm_1 = require("@nestjs/typeorm");
var jwt_1 = require("@nestjs/jwt");
var passport_1 = require("@nestjs/passport");
var auth_controller_1 = require("./auth.controller");
var auth_service_1 = require("./auth.service");
var jwt_strategy_1 = require("./jwt.strategy");
var google_strategy_1 = require("./google.strategy");
var jwt_auth_guard_1 = require("./jwt-auth.guard");
var github_strategy_1 = require("./github.strategy");
var apple_strategy_1 = require("./apple.strategy");
var mailchimp_module_1 = require("../mailchimp/mailchimp.module");
var users_module_1 = require("../users/users.module"); // Import the UsersModule
var AuthModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
                jwt_1.JwtModule.registerAsync({
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: function () {
                        return {
                            secret: process.env.JWT_SECRET,
                            signOptions: {
                                expiresIn: 1500,
                            },
                        };
                    },
                }),
                users_module_1.UsersModule,
                mailchimp_module_1.MailchimpModule,
                typeorm_1.TypeOrmModule.forFeature([user_entity_1.default, company_entity_1.Company]), // Include Company entity here
            ],
            controllers: [auth_controller_1.AuthController],
            providers: [
                auth_service_1.AuthService,
                jwt_strategy_1.JwtStrategy,
                jwt_auth_guard_1.JwtGuard,
                google_strategy_1.GoogleStrategy,
                github_strategy_1.GitHubStrategy,
                apple_strategy_1.AppleStrategy,
            ],
            exports: [jwt_strategy_1.JwtStrategy, passport_1.PassportModule],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthModule = _classThis = /** @class */ (function () {
        function AuthModule_1() {
        }
        return AuthModule_1;
    }());
    __setFunctionName(_classThis, "AuthModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthModule = _classThis;
}();
exports.AuthModule = AuthModule;
