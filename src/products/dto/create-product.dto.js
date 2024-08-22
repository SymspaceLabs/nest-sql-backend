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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var CreateProductDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _company_decorators;
    var _company_initializers = [];
    var _company_extraInitializers = [];
    var _images_decorators;
    var _images_initializers = [];
    var _images_extraInitializers = [];
    var _model3D_decorators;
    var _model3D_initializers = [];
    var _model3D_extraInitializers = [];
    var _size_decorators;
    var _size_initializers = [];
    var _size_extraInitializers = [];
    var _sizeFit_decorators;
    var _sizeFit_initializers = [];
    var _sizeFit_extraInitializers = [];
    var _color_decorators;
    var _color_initializers = [];
    var _color_extraInitializers = [];
    var _quantity_decorators;
    var _quantity_initializers = [];
    var _quantity_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _material_decorators;
    var _material_initializers = [];
    var _material_extraInitializers = [];
    var _productFitting_decorators;
    var _productFitting_initializers = [];
    var _productFitting_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateProductDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.price = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _price_initializers, void 0));
                this.category = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _category_initializers, void 0));
                this.company = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _company_initializers, void 0));
                //
                // @IsArray()
                // @IsOptional()
                // images?: Express.Multer.File[];
                this.images = (__runInitializers(this, _company_extraInitializers), __runInitializers(this, _images_initializers, void 0));
                // images?: File[];
                this.model3D = (__runInitializers(this, _images_extraInitializers), __runInitializers(this, _model3D_initializers, void 0));
                this.size = (__runInitializers(this, _model3D_extraInitializers), __runInitializers(this, _size_initializers, void 0));
                this.sizeFit = (__runInitializers(this, _size_extraInitializers), __runInitializers(this, _sizeFit_initializers, void 0));
                this.color = (__runInitializers(this, _sizeFit_extraInitializers), __runInitializers(this, _color_initializers, void 0));
                this.quantity = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _quantity_initializers, void 0));
                this.type = (__runInitializers(this, _quantity_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.material = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _material_initializers, void 0));
                this.productFitting = (__runInitializers(this, _material_extraInitializers), __runInitializers(this, _productFitting_initializers, void 0));
                __runInitializers(this, _productFitting_extraInitializers);
            }
            return CreateProductDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _description_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _price_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.IsNotEmpty)()];
            _category_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _company_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _images_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Object; })];
            _model3D_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _size_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsOptional)()];
            _sizeFit_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _color_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsOptional)()];
            _quantity_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)()];
            _type_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _material_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _productFitting_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
            __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
            __esDecorate(null, null, _company_decorators, { kind: "field", name: "company", static: false, private: false, access: { has: function (obj) { return "company" in obj; }, get: function (obj) { return obj.company; }, set: function (obj, value) { obj.company = value; } }, metadata: _metadata }, _company_initializers, _company_extraInitializers);
            __esDecorate(null, null, _images_decorators, { kind: "field", name: "images", static: false, private: false, access: { has: function (obj) { return "images" in obj; }, get: function (obj) { return obj.images; }, set: function (obj, value) { obj.images = value; } }, metadata: _metadata }, _images_initializers, _images_extraInitializers);
            __esDecorate(null, null, _model3D_decorators, { kind: "field", name: "model3D", static: false, private: false, access: { has: function (obj) { return "model3D" in obj; }, get: function (obj) { return obj.model3D; }, set: function (obj, value) { obj.model3D = value; } }, metadata: _metadata }, _model3D_initializers, _model3D_extraInitializers);
            __esDecorate(null, null, _size_decorators, { kind: "field", name: "size", static: false, private: false, access: { has: function (obj) { return "size" in obj; }, get: function (obj) { return obj.size; }, set: function (obj, value) { obj.size = value; } }, metadata: _metadata }, _size_initializers, _size_extraInitializers);
            __esDecorate(null, null, _sizeFit_decorators, { kind: "field", name: "sizeFit", static: false, private: false, access: { has: function (obj) { return "sizeFit" in obj; }, get: function (obj) { return obj.sizeFit; }, set: function (obj, value) { obj.sizeFit = value; } }, metadata: _metadata }, _sizeFit_initializers, _sizeFit_extraInitializers);
            __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: function (obj) { return "color" in obj; }, get: function (obj) { return obj.color; }, set: function (obj, value) { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
            __esDecorate(null, null, _quantity_decorators, { kind: "field", name: "quantity", static: false, private: false, access: { has: function (obj) { return "quantity" in obj; }, get: function (obj) { return obj.quantity; }, set: function (obj, value) { obj.quantity = value; } }, metadata: _metadata }, _quantity_initializers, _quantity_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _material_decorators, { kind: "field", name: "material", static: false, private: false, access: { has: function (obj) { return "material" in obj; }, get: function (obj) { return obj.material; }, set: function (obj, value) { obj.material = value; } }, metadata: _metadata }, _material_initializers, _material_extraInitializers);
            __esDecorate(null, null, _productFitting_decorators, { kind: "field", name: "productFitting", static: false, private: false, access: { has: function (obj) { return "productFitting" in obj; }, get: function (obj) { return obj.productFitting; }, set: function (obj, value) { obj.productFitting = value; } }, metadata: _metadata }, _productFitting_initializers, _productFitting_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateProductDto = CreateProductDto;
