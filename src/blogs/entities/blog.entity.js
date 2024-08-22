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
exports.Blog = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var Blog = function () {
    var _classDecorators = [(0, typeorm_1.Entity)(), (0, typeorm_1.Unique)(['slug'])];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _image_decorators;
    var _image_initializers = [];
    var _image_extraInitializers = [];
    var _newsType_decorators;
    var _newsType_initializers = [];
    var _newsType_extraInitializers = [];
    var _author_decorators;
    var _author_initializers = [];
    var _author_extraInitializers = [];
    var _slug_decorators;
    var _slug_initializers = [];
    var _slug_extraInitializers = [];
    var _handle_url_decorators;
    var _handle_url_initializers = [];
    var _handle_url_extraInitializers = [];
    var _handle_url_title_decorators;
    var _handle_url_title_initializers = [];
    var _handle_url_title_extraInitializers = [];
    var _article_source_url_decorators;
    var _article_source_url_initializers = [];
    var _article_source_url_extraInitializers = [];
    var _tag_decorators;
    var _tag_initializers = [];
    var _tag_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var Blog = _classThis = /** @class */ (function () {
        function Blog_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.title = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _title_initializers, void 0));
            this.content = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _content_initializers, void 0));
            this.image = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _image_initializers, void 0));
            this.newsType = (__runInitializers(this, _image_extraInitializers), __runInitializers(this, _newsType_initializers, void 0));
            this.author = (__runInitializers(this, _newsType_extraInitializers), __runInitializers(this, _author_initializers, void 0));
            this.slug = (__runInitializers(this, _author_extraInitializers), __runInitializers(this, _slug_initializers, void 0));
            this.handle_url = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _handle_url_initializers, void 0));
            this.handle_url_title = (__runInitializers(this, _handle_url_extraInitializers), __runInitializers(this, _handle_url_title_initializers, void 0));
            this.article_source_url = (__runInitializers(this, _handle_url_title_extraInitializers), __runInitializers(this, _article_source_url_initializers, void 0));
            this.tag = (__runInitializers(this, _article_source_url_extraInitializers), __runInitializers(this, _tag_initializers, void 0));
            this.createdAt = (__runInitializers(this, _tag_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return Blog_1;
    }());
    __setFunctionName(_classThis, "Blog");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _title_decorators = [(0, typeorm_1.Column)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsString)()];
        _content_decorators = [(0, typeorm_1.Column)('text'), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsString)()];
        _image_decorators = [(0, typeorm_1.Column)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsUrl)()];
        _newsType_decorators = [(0, typeorm_1.Column)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsNumber)()];
        _author_decorators = [(0, typeorm_1.Column)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsString)()];
        _slug_decorators = [(0, typeorm_1.Column)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsString)()];
        _handle_url_decorators = [(0, typeorm_1.Column)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsUrl)()];
        _handle_url_title_decorators = [(0, typeorm_1.Column)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsUrl)()];
        _article_source_url_decorators = [(0, typeorm_1.Column)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsUrl)()];
        _tag_decorators = [(0, typeorm_1.Column)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsString)()];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
        __esDecorate(null, null, _image_decorators, { kind: "field", name: "image", static: false, private: false, access: { has: function (obj) { return "image" in obj; }, get: function (obj) { return obj.image; }, set: function (obj, value) { obj.image = value; } }, metadata: _metadata }, _image_initializers, _image_extraInitializers);
        __esDecorate(null, null, _newsType_decorators, { kind: "field", name: "newsType", static: false, private: false, access: { has: function (obj) { return "newsType" in obj; }, get: function (obj) { return obj.newsType; }, set: function (obj, value) { obj.newsType = value; } }, metadata: _metadata }, _newsType_initializers, _newsType_extraInitializers);
        __esDecorate(null, null, _author_decorators, { kind: "field", name: "author", static: false, private: false, access: { has: function (obj) { return "author" in obj; }, get: function (obj) { return obj.author; }, set: function (obj, value) { obj.author = value; } }, metadata: _metadata }, _author_initializers, _author_extraInitializers);
        __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: function (obj) { return "slug" in obj; }, get: function (obj) { return obj.slug; }, set: function (obj, value) { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
        __esDecorate(null, null, _handle_url_decorators, { kind: "field", name: "handle_url", static: false, private: false, access: { has: function (obj) { return "handle_url" in obj; }, get: function (obj) { return obj.handle_url; }, set: function (obj, value) { obj.handle_url = value; } }, metadata: _metadata }, _handle_url_initializers, _handle_url_extraInitializers);
        __esDecorate(null, null, _handle_url_title_decorators, { kind: "field", name: "handle_url_title", static: false, private: false, access: { has: function (obj) { return "handle_url_title" in obj; }, get: function (obj) { return obj.handle_url_title; }, set: function (obj, value) { obj.handle_url_title = value; } }, metadata: _metadata }, _handle_url_title_initializers, _handle_url_title_extraInitializers);
        __esDecorate(null, null, _article_source_url_decorators, { kind: "field", name: "article_source_url", static: false, private: false, access: { has: function (obj) { return "article_source_url" in obj; }, get: function (obj) { return obj.article_source_url; }, set: function (obj, value) { obj.article_source_url = value; } }, metadata: _metadata }, _article_source_url_initializers, _article_source_url_extraInitializers);
        __esDecorate(null, null, _tag_decorators, { kind: "field", name: "tag", static: false, private: false, access: { has: function (obj) { return "tag" in obj; }, get: function (obj) { return obj.tag; }, set: function (obj, value) { obj.tag = value; } }, metadata: _metadata }, _tag_initializers, _tag_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Blog = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Blog = _classThis;
}();
exports.Blog = Blog;
