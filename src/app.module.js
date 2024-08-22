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
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var typeorm_1 = require("@nestjs/typeorm");
var users_module_1 = require("./users/users.module");
var categories_module_1 = require("./categories/categories.module");
var orders_module_1 = require("./orders/orders.module");
var auth_module_1 = require("./auth/auth.module");
var google_strategy_1 = require("./auth/google.strategy");
var mailchimp_module_1 = require("./mailchimp/mailchimp.module");
var email_module_1 = require("./email/email.module");
var products_module_1 = require("./products/products.module");
var companies_module_1 = require("./companies/companies.module");
var subcategories_module_1 = require("./subcategories/subcategories.module");
var subcategory_items_module_1 = require("./subcategory-items/subcategory-items.module");
var blogs_module_1 = require("./blogs/blogs.module");
var seeder_module_1 = require("./database/seeders/seeder.module");
var stock_module_1 = require("./stock/stock.module");
var product_images_module_1 = require("./product-images/product-images.module");
var config_1 = require("@nestjs/config");
var AppModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: function (configService) { return ({
                        type: 'mysql',
                        host: configService.get('HOST_DB'), //process.env.HOST_DB,
                        port: parseInt(configService.get('HOST_DB_PORT')), //25060,
                        username: configService.get('DB_UNAME'), //process.env.DB_UNAME,
                        password: configService.get('DB_UPASS'), //process.env.DB_UPASS,
                        database: configService.get('DB_NAME'), //process.env.DB_NAME,
                        entities: [__dirname + '/**/*.entity{.ts,.js}'],
                        synchronize: true,
                        options: {
                            encrypt: true,
                            trustServerCertificate: true,
                        },
                    }); },
                }),
                users_module_1.UsersModule,
                categories_module_1.CategoriesModule,
                orders_module_1.OrdersModule,
                auth_module_1.AuthModule,
                mailchimp_module_1.MailchimpModule,
                email_module_1.EmailModule,
                products_module_1.ProductsModule,
                companies_module_1.CompaniesModule,
                subcategories_module_1.SubcategoriesModule,
                subcategory_items_module_1.SubcategoryItemsModule,
                blogs_module_1.BlogsModule,
                seeder_module_1.SeederModule,
                stock_module_1.StockModule,
                product_images_module_1.ProductImagesModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService, google_strategy_1.GoogleStrategy],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
