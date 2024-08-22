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
exports.CreateSubcategoryItemDto = void 0;
var class_validator_1 = require("class-validator");
var CreateSubcategoryItemDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _parent_decorators;
    var _parent_initializers = [];
    var _parent_extraInitializers = [];
    var _subcategoryId_decorators;
    var _subcategoryId_initializers = [];
    var _subcategoryId_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateSubcategoryItemDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.parent = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _parent_initializers, void 0));
                this.subcategoryId = (__runInitializers(this, _parent_extraInitializers), __runInitializers(this, _subcategoryId_initializers, void 0));
                __runInitializers(this, _subcategoryId_extraInitializers);
            }
            return CreateSubcategoryItemDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _parent_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _subcategoryId_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _parent_decorators, { kind: "field", name: "parent", static: false, private: false, access: { has: function (obj) { return "parent" in obj; }, get: function (obj) { return obj.parent; }, set: function (obj, value) { obj.parent = value; } }, metadata: _metadata }, _parent_initializers, _parent_extraInitializers);
            __esDecorate(null, null, _subcategoryId_decorators, { kind: "field", name: "subcategoryId", static: false, private: false, access: { has: function (obj) { return "subcategoryId" in obj; }, get: function (obj) { return obj.subcategoryId; }, set: function (obj, value) { obj.subcategoryId = value; } }, metadata: _metadata }, _subcategoryId_initializers, _subcategoryId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateSubcategoryItemDto = CreateSubcategoryItemDto;
