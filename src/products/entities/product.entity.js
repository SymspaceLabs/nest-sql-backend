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
exports.Product = exports.ProductType = exports.ProductStatus = void 0;
var typeorm_1 = require("typeorm");
var product_image_entity_1 = require("../../product-images/entities/product-image.entity");
var stock_entity_1 = require("../../stock/entities/stock.entity");
var ProductStatus;
(function (ProductStatus) {
    ProductStatus["ACTIVE"] = "Active";
    ProductStatus["DRAFT"] = "Draft";
    ProductStatus["INACTIVE"] = "InActive";
})(ProductStatus || (exports.ProductStatus = ProductStatus = {}));
var ProductType;
(function (ProductType) {
    ProductType["STATIC"] = "Static";
    ProductType["DYNAMIC"] = "Dynamic";
})(ProductType || (exports.ProductType = ProductType = {}));
var Product = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _productStatus_decorators;
    var _productStatus_initializers = [];
    var _productStatus_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _images_decorators;
    var _images_initializers = [];
    var _images_extraInitializers = [];
    var _threeDModel_decorators;
    var _threeDModel_initializers = [];
    var _threeDModel_extraInitializers = [];
    var _productType_decorators;
    var _productType_initializers = [];
    var _productType_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _modelSize_decorators;
    var _modelSize_initializers = [];
    var _modelSize_extraInitializers = [];
    var _productFitting_decorators;
    var _productFitting_initializers = [];
    var _productFitting_extraInitializers = [];
    var _productSizes_decorators;
    var _productSizes_initializers = [];
    var _productSizes_extraInitializers = [];
    var _productColors_decorators;
    var _productColors_initializers = [];
    var _productColors_extraInitializers = [];
    var _productMaterial_decorators;
    var _productMaterial_initializers = [];
    var _productMaterial_extraInitializers = [];
    var _productDimensions_decorators;
    var _productDimensions_initializers = [];
    var _productDimensions_extraInitializers = [];
    var _productSizechart_decorators;
    var _productSizechart_initializers = [];
    var _productSizechart_extraInitializers = [];
    var _productInsurance_decorators;
    var _productInsurance_initializers = [];
    var _productInsurance_extraInitializers = [];
    var _productDescription_decorators;
    var _productDescription_initializers = [];
    var _productDescription_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var _strikethroughPrice_decorators;
    var _strikethroughPrice_initializers = [];
    var _strikethroughPrice_extraInitializers = [];
    var _chargeTax_decorators;
    var _chargeTax_initializers = [];
    var _chargeTax_extraInitializers = [];
    var _costPerProduct_decorators;
    var _costPerProduct_initializers = [];
    var _costPerProduct_extraInitializers = [];
    var _profit_decorators;
    var _profit_initializers = [];
    var _profit_extraInitializers = [];
    var _margin_decorators;
    var _margin_initializers = [];
    var _margin_extraInitializers = [];
    var _stocks_decorators;
    var _stocks_initializers = [];
    var _stocks_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var Product = _classThis = /** @class */ (function () {
        function Product_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.productStatus = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _productStatus_initializers, void 0));
            // @Column()
            this.name = (__runInitializers(this, _productStatus_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.images = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _images_initializers, void 0));
            this.threeDModel = (__runInitializers(this, _images_extraInitializers), __runInitializers(this, _threeDModel_initializers, void 0));
            this.productType = (__runInitializers(this, _threeDModel_extraInitializers), __runInitializers(this, _productType_initializers, void 0));
            this.category = (__runInitializers(this, _productType_extraInitializers), __runInitializers(this, _category_initializers, void 0));
            this.modelSize = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _modelSize_initializers, void 0));
            this.productFitting = (__runInitializers(this, _modelSize_extraInitializers), __runInitializers(this, _productFitting_initializers, void 0));
            this.productSizes = (__runInitializers(this, _productFitting_extraInitializers), __runInitializers(this, _productSizes_initializers, void 0));
            this.productColors = (__runInitializers(this, _productSizes_extraInitializers), __runInitializers(this, _productColors_initializers, void 0));
            this.productMaterial = (__runInitializers(this, _productColors_extraInitializers), __runInitializers(this, _productMaterial_initializers, void 0));
            this.productDimensions = (__runInitializers(this, _productMaterial_extraInitializers), __runInitializers(this, _productDimensions_initializers, void 0));
            this.productSizechart = (__runInitializers(this, _productDimensions_extraInitializers), __runInitializers(this, _productSizechart_initializers, void 0));
            this.productInsurance = (__runInitializers(this, _productSizechart_extraInitializers), __runInitializers(this, _productInsurance_initializers, void 0));
            this.productDescription = (__runInitializers(this, _productInsurance_extraInitializers), __runInitializers(this, _productDescription_initializers, void 0));
            this.price = (__runInitializers(this, _productDescription_extraInitializers), __runInitializers(this, _price_initializers, void 0));
            this.strikethroughPrice = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _strikethroughPrice_initializers, void 0));
            this.chargeTax = (__runInitializers(this, _strikethroughPrice_extraInitializers), __runInitializers(this, _chargeTax_initializers, void 0));
            this.costPerProduct = (__runInitializers(this, _chargeTax_extraInitializers), __runInitializers(this, _costPerProduct_initializers, void 0));
            this.profit = (__runInitializers(this, _costPerProduct_extraInitializers), __runInitializers(this, _profit_initializers, void 0));
            this.margin = (__runInitializers(this, _profit_extraInitializers), __runInitializers(this, _margin_initializers, void 0));
            this.stocks = (__runInitializers(this, _margin_extraInitializers), __runInitializers(this, _stocks_initializers, void 0));
            this.createdAt = (__runInitializers(this, _stocks_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return Product_1;
    }());
    __setFunctionName(_classThis, "Product");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _productStatus_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: ProductStatus,
                default: ProductStatus.DRAFT,
            })];
        _name_decorators = [(0, typeorm_1.Column)()];
        _images_decorators = [(0, typeorm_1.OneToMany)(function () { return product_image_entity_1.ProductImage; }, function (productImages) { return productImages.product; }, {
                cascade: true,
            })];
        _threeDModel_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _productType_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: ProductType,
                default: ProductType.STATIC,
            })];
        _category_decorators = [(0, typeorm_1.Column)()];
        _modelSize_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _productFitting_decorators = [(0, typeorm_1.Column)()];
        _productSizes_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _productColors_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _productMaterial_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _productDimensions_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false, nullable: true })];
        _productSizechart_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false, nullable: true })];
        _productInsurance_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _productDescription_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _price_decorators = [(0, typeorm_1.Column)({ type: 'float', nullable: true })];
        _strikethroughPrice_decorators = [(0, typeorm_1.Column)({ type: 'float', nullable: true })];
        _chargeTax_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _costPerProduct_decorators = [(0, typeorm_1.Column)({ type: 'float', default: 0.0 })];
        _profit_decorators = [(0, typeorm_1.Column)({ type: 'float', default: 0.0 })];
        _margin_decorators = [(0, typeorm_1.Column)({ type: 'float', default: 0.0 })];
        _stocks_decorators = [(0, typeorm_1.OneToMany)(function () { return stock_entity_1.Stock; }, function (stock) { return stock.product; }, {
                cascade: true,
            })];
        _createdAt_decorators = [(0, typeorm_1.Column)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _productStatus_decorators, { kind: "field", name: "productStatus", static: false, private: false, access: { has: function (obj) { return "productStatus" in obj; }, get: function (obj) { return obj.productStatus; }, set: function (obj, value) { obj.productStatus = value; } }, metadata: _metadata }, _productStatus_initializers, _productStatus_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _images_decorators, { kind: "field", name: "images", static: false, private: false, access: { has: function (obj) { return "images" in obj; }, get: function (obj) { return obj.images; }, set: function (obj, value) { obj.images = value; } }, metadata: _metadata }, _images_initializers, _images_extraInitializers);
        __esDecorate(null, null, _threeDModel_decorators, { kind: "field", name: "threeDModel", static: false, private: false, access: { has: function (obj) { return "threeDModel" in obj; }, get: function (obj) { return obj.threeDModel; }, set: function (obj, value) { obj.threeDModel = value; } }, metadata: _metadata }, _threeDModel_initializers, _threeDModel_extraInitializers);
        __esDecorate(null, null, _productType_decorators, { kind: "field", name: "productType", static: false, private: false, access: { has: function (obj) { return "productType" in obj; }, get: function (obj) { return obj.productType; }, set: function (obj, value) { obj.productType = value; } }, metadata: _metadata }, _productType_initializers, _productType_extraInitializers);
        __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
        __esDecorate(null, null, _modelSize_decorators, { kind: "field", name: "modelSize", static: false, private: false, access: { has: function (obj) { return "modelSize" in obj; }, get: function (obj) { return obj.modelSize; }, set: function (obj, value) { obj.modelSize = value; } }, metadata: _metadata }, _modelSize_initializers, _modelSize_extraInitializers);
        __esDecorate(null, null, _productFitting_decorators, { kind: "field", name: "productFitting", static: false, private: false, access: { has: function (obj) { return "productFitting" in obj; }, get: function (obj) { return obj.productFitting; }, set: function (obj, value) { obj.productFitting = value; } }, metadata: _metadata }, _productFitting_initializers, _productFitting_extraInitializers);
        __esDecorate(null, null, _productSizes_decorators, { kind: "field", name: "productSizes", static: false, private: false, access: { has: function (obj) { return "productSizes" in obj; }, get: function (obj) { return obj.productSizes; }, set: function (obj, value) { obj.productSizes = value; } }, metadata: _metadata }, _productSizes_initializers, _productSizes_extraInitializers);
        __esDecorate(null, null, _productColors_decorators, { kind: "field", name: "productColors", static: false, private: false, access: { has: function (obj) { return "productColors" in obj; }, get: function (obj) { return obj.productColors; }, set: function (obj, value) { obj.productColors = value; } }, metadata: _metadata }, _productColors_initializers, _productColors_extraInitializers);
        __esDecorate(null, null, _productMaterial_decorators, { kind: "field", name: "productMaterial", static: false, private: false, access: { has: function (obj) { return "productMaterial" in obj; }, get: function (obj) { return obj.productMaterial; }, set: function (obj, value) { obj.productMaterial = value; } }, metadata: _metadata }, _productMaterial_initializers, _productMaterial_extraInitializers);
        __esDecorate(null, null, _productDimensions_decorators, { kind: "field", name: "productDimensions", static: false, private: false, access: { has: function (obj) { return "productDimensions" in obj; }, get: function (obj) { return obj.productDimensions; }, set: function (obj, value) { obj.productDimensions = value; } }, metadata: _metadata }, _productDimensions_initializers, _productDimensions_extraInitializers);
        __esDecorate(null, null, _productSizechart_decorators, { kind: "field", name: "productSizechart", static: false, private: false, access: { has: function (obj) { return "productSizechart" in obj; }, get: function (obj) { return obj.productSizechart; }, set: function (obj, value) { obj.productSizechart = value; } }, metadata: _metadata }, _productSizechart_initializers, _productSizechart_extraInitializers);
        __esDecorate(null, null, _productInsurance_decorators, { kind: "field", name: "productInsurance", static: false, private: false, access: { has: function (obj) { return "productInsurance" in obj; }, get: function (obj) { return obj.productInsurance; }, set: function (obj, value) { obj.productInsurance = value; } }, metadata: _metadata }, _productInsurance_initializers, _productInsurance_extraInitializers);
        __esDecorate(null, null, _productDescription_decorators, { kind: "field", name: "productDescription", static: false, private: false, access: { has: function (obj) { return "productDescription" in obj; }, get: function (obj) { return obj.productDescription; }, set: function (obj, value) { obj.productDescription = value; } }, metadata: _metadata }, _productDescription_initializers, _productDescription_extraInitializers);
        __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
        __esDecorate(null, null, _strikethroughPrice_decorators, { kind: "field", name: "strikethroughPrice", static: false, private: false, access: { has: function (obj) { return "strikethroughPrice" in obj; }, get: function (obj) { return obj.strikethroughPrice; }, set: function (obj, value) { obj.strikethroughPrice = value; } }, metadata: _metadata }, _strikethroughPrice_initializers, _strikethroughPrice_extraInitializers);
        __esDecorate(null, null, _chargeTax_decorators, { kind: "field", name: "chargeTax", static: false, private: false, access: { has: function (obj) { return "chargeTax" in obj; }, get: function (obj) { return obj.chargeTax; }, set: function (obj, value) { obj.chargeTax = value; } }, metadata: _metadata }, _chargeTax_initializers, _chargeTax_extraInitializers);
        __esDecorate(null, null, _costPerProduct_decorators, { kind: "field", name: "costPerProduct", static: false, private: false, access: { has: function (obj) { return "costPerProduct" in obj; }, get: function (obj) { return obj.costPerProduct; }, set: function (obj, value) { obj.costPerProduct = value; } }, metadata: _metadata }, _costPerProduct_initializers, _costPerProduct_extraInitializers);
        __esDecorate(null, null, _profit_decorators, { kind: "field", name: "profit", static: false, private: false, access: { has: function (obj) { return "profit" in obj; }, get: function (obj) { return obj.profit; }, set: function (obj, value) { obj.profit = value; } }, metadata: _metadata }, _profit_initializers, _profit_extraInitializers);
        __esDecorate(null, null, _margin_decorators, { kind: "field", name: "margin", static: false, private: false, access: { has: function (obj) { return "margin" in obj; }, get: function (obj) { return obj.margin; }, set: function (obj, value) { obj.margin = value; } }, metadata: _metadata }, _margin_initializers, _margin_extraInitializers);
        __esDecorate(null, null, _stocks_decorators, { kind: "field", name: "stocks", static: false, private: false, access: { has: function (obj) { return "stocks" in obj; }, get: function (obj) { return obj.stocks; }, set: function (obj, value) { obj.stocks = value; } }, metadata: _metadata }, _stocks_initializers, _stocks_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Product = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Product = _classThis;
}();
exports.Product = Product;
