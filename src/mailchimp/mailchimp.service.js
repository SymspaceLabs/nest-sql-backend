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
exports.MailchimpService = void 0;
var common_1 = require("@nestjs/common");
var Mailchimp = require("@mailchimp/mailchimp_marketing");
var MailchimpTransactional = require("@mailchimp/mailchimp_transactional");
var MailchimpService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var MailchimpService = _classThis = /** @class */ (function () {
        function MailchimpService_1(configService) {
            this.configService = configService;
            this.logger = new common_1.Logger(MailchimpService.name);
            Mailchimp.setConfig({
                apiKey: process.env.MAILCHIMP_API_KEY,
                server: process.env.MAILCHIMP_SERVER_PREFIX,
            });
            this.transactionalClient = MailchimpTransactional(process.env.MAILCHIMP_TRANSACTIONAL_API_KEY);
        }
        MailchimpService_1.prototype.addOrUpdateMember = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, Mailchimp.lists.setListMember(process.env.MAILCHIMP_LIST_ID, email, {
                                    email_address: email,
                                    status_if_new: 'pending',
                                })];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response];
                        case 2:
                            error_1 = _a.sent();
                            this.logger.error("Failed to add or update member: ".concat(error_1.message));
                            throw error_1;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        MailchimpService_1.prototype.sendVerificationEmail = function (email, verificationUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.transactionalClient.messages.send({
                                    key: process.env.MAILCHIMP_TRANSACTIONAL_API_KEY,
                                    message: {
                                        from_email: 'contact@symspacelabs.com',
                                        subject: 'Verify your email address',
                                        to: [{ email: email, type: 'to' }],
                                        html: "<!DOCTYPE html><html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\"><head>\n<!--[if gte mso 15]>\n<xml>\n<o:OfficeDocumentSettings>\n<o:AllowPNG/>\n<o:PixelsPerInch>96</o:PixelsPerInch>\n</o:OfficeDocumentSettings>\n</xml>\n<![endif]-->\n<meta charset=\"UTF-8\"/>\n<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"/>\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/>\n<title>*|MC:SUBJECT|*</title>\n<link rel=\"stylesheet\" type=\"text/css\" id=\"newGoogleFontsStatic\" href=\"https://fonts.googleapis.com/css?family=Aldrich:400,400i,700,700i,900,900i|ABeeZee:400,400i,700,700i,900,900i\"/><style>          img{-ms-interpolation-mode:bicubic;} \n          table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} \n          .mceStandardButton, .mceStandardButton td, .mceStandardButton td a{mso-hide:all !important;} \n          p, a, li, td, blockquote{mso-line-height-rule:exactly;} \n          p, a, li, td, body, table, blockquote{-ms-text-size-adjust:100%; -webkit-text-size-adjust:100%;} \n          @media only screen and (max-width: 480px){\n            body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:none !important;} \n          }\n          .mcnPreviewText{display: none !important;} \n          .bodyCell{margin:0 auto; padding:0; width:100%;}\n          .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font{line-height:100%;} \n          .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} \n          a[x-apple-data-detectors]{color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important;} \n            body{height:100%; margin:0; padding:0; width:100%; background: #ffffff;}\n            p{margin:0; padding:0;} \n            table{border-collapse:collapse;} \n            td, p, a{word-break:break-word;} \n            h1, h2, h3, h4, h5, h6{display:block; margin:0; padding:0;} \n            img, a img{border:0; height:auto; outline:none; text-decoration:none;} \n            a[href^=\"tel\"], a[href^=\"sms\"]{color:inherit; cursor:default; text-decoration:none;} \n            li p {margin: 0 !important;}\n            .ProseMirror a {\n                pointer-events: none;\n            }\n            @media only screen and (max-width: 640px){\n                .mceClusterLayout td{padding: 4px !important;} \n            }\n            @media only screen and (max-width: 480px){\n                body{width:100% !important; min-width:100% !important; } \n                body.mobile-native {\n                    -webkit-user-select: none; user-select: none; transition: transform 0.2s ease-in; transform-origin: top center;\n                }\n                body.mobile-native.selection-allowed a, body.mobile-native.selection-allowed .ProseMirror {\n                    user-select: auto;\n                    -webkit-user-select: auto;\n                }\n                colgroup{display: none;}\n                img{height: auto !important;}\n                .mceWidthContainer{max-width: 660px !important;}\n                .mceColumn{display: block !important; width: 100% !important;}\n                .mceColumn-forceSpan{display: table-cell !important; width: auto !important;}\n                .mceColumn-forceSpan .mceButton a{min-width:0 !important;}\n                .mceBlockContainer{padding-right:16px !important; padding-left:16px !important;} \n                .mceTextBlockContainer{padding-right:16px !important; padding-left:16px !important;} \n                .mceBlockContainerE2E{padding-right:0px; padding-left:0px;} \n                .mceSpacing-24{padding-right:16px !important; padding-left:16px !important;}\n                .mceImage, .mceLogo{width: 100% !important; height: auto !important;} \n                .mceFooterSection .mceText, .mceFooterSection .mceText p{font-size: 16px !important; line-height: 140% !important;}\n            }\n            div[contenteditable=\"true\"] {outline: 0;}\n            .ProseMirror h1.empty-node:only-child::before,\n            .ProseMirror h2.empty-node:only-child::before,\n            .ProseMirror h3.empty-node:only-child::before,\n            .ProseMirror h4.empty-node:only-child::before {\n                content: 'Heading';\n            }\n            .ProseMirror p.empty-node:only-child::before, .ProseMirror:empty::before {\n                content: 'Start typing...';\n            }\n            .mceImageBorder {display: inline-block;}\n            .mceImageBorder img {border: 0 !important;}\nbody, #bodyTable { background-color: rgb(255, 255, 255); }.mceText, .mcnTextContent, .mceLabel { font-family: ABeeZee, \"Helvetica Neue\", Helvetica, Arial, Verdana, sans-serif; }.mceText, .mcnTextContent, .mceLabel { color: rgb(255, 255, 255); }.mceText h2 { margin-bottom: 0px; }.mceText p { margin-bottom: 0px; }.mceText label { margin-bottom: 0px; }.mceText input { margin-bottom: 0px; }.mceSpacing-24 .mceInput + .mceErrorMessage { margin-top: -12px; }.mceText h2 { margin-bottom: 0px; }.mceText p { margin-bottom: 0px; }.mceText label { margin-bottom: 0px; }.mceText input { margin-bottom: 0px; }.mceSpacing-12 .mceInput + .mceErrorMessage { margin-top: -6px; }.mceText h2 { margin-bottom: 0px; }.mceText p { margin-bottom: 0px; }.mceText label { margin-bottom: 0px; }.mceText input { margin-bottom: 0px; }.mceSpacing-60 .mceInput + .mceErrorMessage { margin-top: -30px; }.mceInput { background-color: transparent; border: 2px solid rgb(208, 208, 208); width: 60%; color: rgb(77, 77, 77); display: block; }.mceInput[type=\"radio\"], .mceInput[type=\"checkbox\"] { float: left; margin-right: 12px; display: inline; width: auto !important; }.mceLabel > .mceInput { margin-bottom: 0px; margin-top: 2px; }.mceLabel { display: block; }.mceText p, .mcnTextContent p { color: rgb(255, 255, 255); font-family: ABeeZee, \"Helvetica Neue\", Helvetica, Arial, Verdana, sans-serif; font-size: 15px; font-weight: normal; line-height: 125%; text-align: left; direction: ltr; }.mceText h2, .mcnTextContent h2 { color: rgb(37, 37, 37); font-family: \"Helvetica Neue\", Helvetica, Arial, Verdana, sans-serif; font-size: 22px; font-weight: normal; line-height: 125%; text-align: left; direction: ltr; }\n@media only screen and (max-width: 480px) {\n            .mceText p { margin: 0px; font-size: 16px !important; line-height: 125% !important; }\n          }\n@media only screen and (max-width: 480px) {\n            .mceText h2 { font-size: 22px !important; line-height: 125% !important; }\n          }\n@media only screen and (max-width: 480px) {\n            .mceBlockContainer { padding-left: 0px !important; padding-right: 0px !important; }\n          }\n@media only screen and (max-width: 480px) {\n            .mceButtonContainer { width: fit-content !important; max-width: fit-content !important; }.mceButtonLink { padding: 18px 28px !important; font-size: 16px !important; }\n          }\n#dataBlockId-24 p, #dataBlockId-24 h1, #dataBlockId-24 h2, #dataBlockId-24 h3, #dataBlockId-24 h4, #dataBlockId-24 ul { text-align: start; }#dataBlockId-24 p, #dataBlockId-24 h1, #dataBlockId-24 h2, #dataBlockId-24 h3, #dataBlockId-24 h4, #dataBlockId-24 ul { color: rgb(255, 255, 255); }\n@media only screen and (max-width: 480px) {\n        .mobileClass-47 {padding-left: 12 !important;padding-top: 0 !important;padding-right: 12 !important;}.mobileClass-47 {padding-left: 12 !important;padding-top: 0 !important;padding-right: 12 !important;}.mobileClass-47 {padding-left: 12 !important;padding-top: 0 !important;padding-right: 12 !important;}.mobileClass-47 {padding-left: 12 !important;padding-top: 0 !important;padding-right: 12 !important;}.mobileClass-47 {padding-left: 12 !important;padding-top: 0 !important;padding-right: 12 !important;}\n      }</style>\n<script>!function(){function o(n,i){if(n&&i)for(var r in i)i.hasOwnProperty(r)&&(void 0===n[r]?n[r]=i[r]:n[r].constructor===Object&&i[r].constructor===Object?o(n[r],i[r]):n[r]=i[r])}try{var n=decodeURIComponent(\"%7B%0A%22ResourceTiming%22%3A%7B%0A%22comment%22%3A%20%22Clear%20RT%20Buffer%20on%20mPulse%20beacon%22%2C%0A%22clearOnBeacon%22%3A%20true%0A%7D%2C%0A%22AutoXHR%22%3A%7B%0A%22comment%22%3A%20%22Monitor%20XHRs%20requested%20using%20FETCH%22%2C%0A%22monitorFetch%22%3A%20true%2C%0A%22comment%22%3A%20%22Start%20Monitoring%20SPAs%20from%20Click%22%2C%0A%22spaStartFromClick%22%3A%20true%0A%7D%2C%0A%22PageParams%22%3A%7B%0A%22comment%22%3A%20%22Monitor%20all%20SPA%20XHRs%22%2C%0A%22spaXhr%22%3A%20%22all%22%0A%7D%0A%7D\");if(n.length>0&&window.JSON&&\"function\"==typeof window.JSON.parse){var i=JSON.parse(n);void 0!==window.BOOMR_config?o(window.BOOMR_config,i):window.BOOMR_config=i}}catch(r){window.console&&\"function\"==typeof window.console.error&&console.error(\"mPulse: Could not parse configuration\",r)}}();</script>\n                              <script>!function(e){var n=\"https://s.go-mpulse.net/boomerang/\";if(\"True\"==\"True\")e.BOOMR_config=e.BOOMR_config||{},e.BOOMR_config.PageParams=e.BOOMR_config.PageParams||{},e.BOOMR_config.PageParams.pci=!0,n=\"https://s2.go-mpulse.net/boomerang/\";if(window.BOOMR_API_key=\"QAT5G-9HZLF-7EDMX-YMVCJ-QZJDA\",function(){function e(){if(!r){var e=document.createElement(\"script\");e.id=\"boomr-scr-as\",e.src=window.BOOMR.url,e.async=!0,o.appendChild(e),r=!0}}function t(e){r=!0;var n,t,a,i,d=document,O=window;if(window.BOOMR.snippetMethod=e?\"if\":\"i\",t=function(e,n){var t=d.createElement(\"script\");t.id=n||\"boomr-if-as\",t.src=window.BOOMR.url,BOOMR_lstart=(new Date).getTime(),e=e||d.body,e.appendChild(t)},!window.addEventListener&&window.attachEvent&&navigator.userAgent.match(/MSIE [67]./))return window.BOOMR.snippetMethod=\"s\",void t(o,\"boomr-async\");a=document.createElement(\"IFRAME\"),a.src=\"about:blank\",a.title=\"\",a.role=\"presentation\",a.loading=\"eager\",i=(a.frameElement||a).style,i.width=0,i.height=0,i.border=0,i.display=\"none\",o.appendChild(a);try{O=a.contentWindow,d=O.document.open()}catch(_){n=document.domain,a.src=\"javascript:var d=document.open();d.domain='\"+n+\"';void 0;\",O=a.contentWindow,d=O.document.open()}if(n)d._boomrl=function(){this.domain=n,t()},d.write(\"<bo\"+\"dy onload='document._boomrl();'>\");else if(O._boomrl=function(){t()},O.addEventListener)O.addEventListener(\"load\",O._boomrl,!1);else if(O.attachEvent)O.attachEvent(\"onload\",O._boomrl);d.close()}function a(e){window.BOOMR_onload=e&&e.timeStamp||(new Date).getTime()}if(!window.BOOMR||!window.BOOMR.version&&!window.BOOMR.snippetExecuted){window.BOOMR=window.BOOMR||{},window.BOOMR.snippetStart=(new Date).getTime(),window.BOOMR.snippetExecuted=!0,window.BOOMR.snippetVersion=14,window.BOOMR.url=n+\"QAT5G-9HZLF-7EDMX-YMVCJ-QZJDA\";var i=document.currentScript||document.getElementsByTagName(\"script\")[0],o=i.parentNode,r=!1,d=document.createElement(\"link\");if(d.relList&&\"function\"==typeof d.relList.supports&&d.relList.supports(\"preload\")&&\"as\"in d)window.BOOMR.snippetMethod=\"p\",d.href=window.BOOMR.url,d.rel=\"preload\",d.as=\"script\",d.addEventListener(\"load\",e),d.addEventListener(\"error\",function(){t(!0)}),setTimeout(function(){if(!r)t(!0)},3e3),BOOMR_lstart=(new Date).getTime(),o.appendChild(d);else t(!1);if(window.addEventListener)window.addEventListener(\"load\",a,!1);else if(window.attachEvent)window.attachEvent(\"onload\",a)}}(),\"400\".length>0)if(e&&\"performance\"in e&&e.performance&&\"function\"==typeof e.performance.setResourceTimingBufferSize)e.performance.setResourceTimingBufferSize(400);!function(){if(BOOMR=e.BOOMR||{},BOOMR.plugins=BOOMR.plugins||{},!BOOMR.plugins.AK){var n=\"\"==\"true\"?1:0,t=\"\",a=\"nqc7pqqxzgqkazviouxa-f-5436bc6fc-clientnsv4-s.akamaihd.net\",i=\"false\"==\"true\"?2:1,o={\"ak.v\":\"37\",\"ak.cp\":\"641031\",\"ak.ai\":parseInt(\"761902\",10),\"ak.ol\":\"0\",\"ak.cr\":2,\"ak.ipv\":4,\"ak.proto\":\"h2\",\"ak.rid\":\"a13af403\",\"ak.r\":47372,\"ak.a2\":n,\"ak.m\":\"x\",\"ak.n\":\"essl\",\"ak.bpcip\":\"108.5.247.0\",\"ak.cport\":54760,\"ak.gh\":\"23.195.36.164\",\"ak.quicv\":\"\",\"ak.tlsv\":\"tls1.3\",\"ak.0rtt\":\"\",\"ak.csrc\":\"-\",\"ak.acc\":\"\",\"ak.t\":\"1722316078\",\"ak.ak\":\"hOBiQwZUYzCg5VSAfCLimQ==zZlT2o26PmFSfIjZTkaGA4kV/8IXEkLnhMiJEk2QJh72TMwVwPhXcFuOWPE+XnzDXGWEV90SFgr2lq8wiS57fuEOqEPlQdUsTtmdjQA4FLAMvV48POd4BGoSKhr83ehp7/U54jpF03fOADrzQiylixjriU0MIi3bSVB9yNuUeAgfGYShIfH9r8iPGWyVSmy/kwBO4/YC4AtjOvyZQfM8bJgDkrtfaf35PD4+GDc0b0zg4lUMflaEpe0cehvqgnb7Zntt04kwI8haJ7T132dcR3AqwXDxfSmlXWLrB5rE6T6A4f+O63ClsrPPi+VRtHM9qvQQQc1BzsJx1pqkDkJFW4uKPO2gaDtRSMFxuTsvI//Nr4l8peaX8xnJOzZL4Iq5ouOmU3mJ2Kk7Gn08rDofy62Yysc6EjLb+nnxxLt7LDE=\",\"ak.pv\":\"104\",\"ak.dpoabenc\":\"\",\"ak.tf\":i};if(\"\"!==t)o[\"ak.ruds\"]=t;var r={i:!1,av:function(n){var t=\"http.initiator\";if(n&&(!n[t]||\"spa_hard\"===n[t]))o[\"ak.feo\"]=void 0!==e.aFeoApplied?1:0,BOOMR.addVar(o)},rv:function(){var e=[\"ak.bpcip\",\"ak.cport\",\"ak.cr\",\"ak.csrc\",\"ak.gh\",\"ak.ipv\",\"ak.m\",\"ak.n\",\"ak.ol\",\"ak.proto\",\"ak.quicv\",\"ak.tlsv\",\"ak.0rtt\",\"ak.r\",\"ak.acc\",\"ak.t\",\"ak.tf\"];BOOMR.removeVar(e)}};BOOMR.plugins.AK={akVars:o,akDNSPreFetchDomain:a,init:function(){if(!r.i){var e=BOOMR.subscribe;e(\"before_beacon\",r.av,null,null),e(\"onbeacon\",r.rv,null,null),r.i=!0}return this},is_complete:function(){return!0}}}}()}(window);</script></head>\n<body>\n<!--*|IF:MC_PREVIEW_TEXT|*-->\n<!--[if !gte mso 9]><!----><span class=\"mcnPreviewText\" style=\"display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;\">*|MC_PREVIEW_TEXT|*</span><!--<![endif]-->\n<!--*|END:IF|*-->\n<center>\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" height=\"100%\" width=\"100%\" id=\"bodyTable\" style=\"background-color: rgb(255, 255, 255);\">\n<tbody><tr>\n<td class=\"bodyCell\" align=\"center\" valign=\"top\">\n<table id=\"root\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tbody data-block-id=\"28\" class=\"mceWrapper\"><tr><td align=\"center\" valign=\"top\" class=\"mceWrapperOuter\"><!--[if (gte mso 9)|(IE)]><table align=\"center\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"660\" style=\"width:660px;\"><tr><td><![endif]--><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:660px\" role=\"presentation\"><tbody><tr><td style=\"background-color:#ffffff;background-position:center;background-repeat:no-repeat;background-size:cover\" class=\"mceWrapperInner\" valign=\"top\"><table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\" data-block-id=\"27\"><tbody><tr class=\"mceRow\"><td style=\"background-position:center;background-repeat:no-repeat;background-size:cover\" valign=\"top\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\"><tbody><tr><td style=\"padding-top:0;padding-bottom:0\" class=\"mceColumn\" data-block-id=\"-15\" valign=\"top\" colspan=\"12\" width=\"100%\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\"><tbody><tr><td style=\"background-color:#1a1a1a;padding-top:50px;padding-bottom:50px;padding-right:0;padding-left:0\" class=\"mceBlockContainer\" align=\"center\" valign=\"top\"><span class=\"mceImageBorder\" style=\"border:0;vertical-align:top;margin:0\"><img data-block-id=\"34\" width=\"561\" height=\"auto\" style=\"width:561px;height:auto;max-width:660px !important;display:block\" alt=\"\" src=\"https://mcusercontent.com/a62685d4d57a50fca81707ed2/images/9015c1ea-e196-88c6-580b-d75eb3024af7.png\" role=\"presentation\" class=\"imageDropZone mceImage\"/></span></td></tr><tr><td class=\"mceGutterContainer\" valign=\"top\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"border-collapse:separate\" role=\"presentation\"><tbody><tr><td style=\"background-color:#ebebeb;padding-top:50px;padding-bottom:50px;padding-right:0;padding-left:0\" class=\"mceLayoutContainer\" valign=\"top\"><table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\" data-block-id=\"21\" id=\"section_ac7443c6203f0c103f3c57e66bdbab4c\" class=\"mceLayout\"><tbody><tr class=\"mceRow\"><td style=\"background-position:center;background-repeat:no-repeat;background-size:cover\" valign=\"top\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\"><tbody><tr><td class=\"mceColumn\" data-block-id=\"-14\" valign=\"top\" colspan=\"12\" width=\"100%\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\"><tbody><tr><td align=\"center\" valign=\"top\"><table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\" data-block-id=\"-5\"><tbody><tr class=\"mceRow\"><td style=\"background-position:center;background-repeat:no-repeat;background-size:cover\" valign=\"top\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\"><tbody><tr><td class=\"mceColumn\" data-block-id=\"-16\" valign=\"top\" colspan=\"12\" width=\"100%\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\"><tbody><tr><td valign=\"top\"><table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\" data-block-id=\"20\"><tbody><tr class=\"mceRow\"><td style=\"background-position:center;background-repeat:no-repeat;background-size:cover\" valign=\"top\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"24\" width=\"100%\" role=\"presentation\"><tbody><tr><td style=\"padding-top:0;padding-bottom:0\" class=\"mceColumn\" data-block-id=\"19\" valign=\"top\" colspan=\"12\" width=\"100%\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\"><tbody><tr><td style=\"padding-top:0;padding-bottom:0;padding-right:0;padding-left:0\" valign=\"top\"><table width=\"100%\" style=\"border:0;background-color:transparent;border-collapse:separate\"><tbody><tr><td style=\"padding-left:50px;padding-right:50px;padding-top:12px;padding-bottom:12px\" class=\"mceTextBlockContainer\"><div data-block-id=\"16\" class=\"mceText\" id=\"dataBlockId-16\" style=\"width:100%\"><h2 style=\"line-height: 125%; text-align: center;\" class=\"last-child\"><strong><span style=\"color:#1a1a1a;\"><span style=\"font-size: 50px\"><span style=\"font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif\">Account Verification</span></span></span></strong></h2></div></td></tr></tbody></table></td></tr><tr><td style=\"padding-top:0;padding-bottom:0;padding-right:0;padding-left:0\" valign=\"top\"><table width=\"100%\" style=\"border:0;border-collapse:separate\"><tbody><tr><td style=\"padding-left:50px;padding-right:50px;padding-top:20px;padding-bottom:20px\" class=\"mceTextBlockContainer\"><div data-block-id=\"17\" class=\"mceText\" id=\"dataBlockId-17\" style=\"width:100%\"><p style=\"text-align: center;\" class=\"last-child\"><span style=\"color:#707070;\"><span style=\"font-size: 18px\"><span style=\"font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif\">Please verify your email address by clicking the link below</span></span></span></p></div></td></tr></tbody></table></td></tr><tr><td style=\"background-color:#ebebeb;padding-top:10px;padding-bottom:10px;padding-right:50px;padding-left:20px\" class=\"mceBlockContainer\" align=\"center\" valign=\"top\"><table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" data-block-id=\"18\" class=\"mceButtonContainer\"><tbody><tr><!--[if !mso]><!--></tr><tr class=\"mceStandardButton\"><td style=\"background-color:#2260e1;border-radius:20px;text-align:center\" class=\"mceButton\" valign=\"top\"><a href=\"".concat(verificationUrl, "\" target=\"_blank\" class=\"mceButtonLink\" style=\"background-color:#2260e1;border-radius:20px;border:4px solid #ffffff;color:#ffffff;display:block;font-family:'Aldrich', 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;font-size:16px;font-weight:normal;font-style:normal;padding:16px 28px;text-decoration:none;min-width:30px;text-align:center;direction:ltr;letter-spacing:0px\">CONFIRM</a></td></tr><tr><!--<![endif]--></tr><tr>\n<!--[if mso]>\n<td align=\"center\">\n<v:roundrect xmlns:v=\"urn:schemas-microsoft-com:vml\"\nxmlns:w=\"urn:schemas-microsoft-com:office:word\"\nhref=\"\"\nstyle=\"v-text-anchor:middle; width:142px; height:60px;\"\narcsize=\"14%\"\nstrokecolor=\"#ffffff\"\nstrokeweight=\"4px\"\nfillcolor=\"#2260e1\">\n<v:stroke dashstyle=\"solid\"/>\n<w:anchorlock />\n<center style=\"\ncolor: #ffffff;\ndisplay: block;\nfont-family: 'Aldrich', 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif;\nfont-size: 16;\nfont-style: normal;\nfont-weight: normal;\nletter-spacing: 0px;\ntext-decoration: none;\ntext-align: center;\ndirection: ltr;\"\n>\nCONFIRM\n</center>\n</v:roundrect>\n</td>\n<![endif]-->\n</tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style=\"background-color:#1a1a1a;padding-top:50px;padding-bottom:50px;padding-right:0;padding-left:0\" class=\"mceLayoutContainer\" valign=\"top\"><table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\" data-block-id=\"22\"><tbody><tr class=\"mceRow\"><td style=\"background-color:#1a1a1a;background-position:center;background-repeat:no-repeat;background-size:cover;padding-top:0px;padding-bottom:0px\" valign=\"top\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"24\" width=\"100%\" role=\"presentation\"><tbody><tr><td class=\"mceColumn\" data-block-id=\"-13\" valign=\"top\" colspan=\"12\" width=\"100%\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\"><tbody><tr><td align=\"center\" valign=\"top\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"\" role=\"presentation\" class=\"mceClusterLayout\" data-block-id=\"-12\"><tbody><tr><td style=\"padding-left:30px;padding-top:0;padding-right:30px\" data-breakpoint=\"47\" valign=\"top\" class=\"mobileClass-47\"><a href=\"https://www.instagram.com/symspacelabs/\" style=\"display:block\" target=\"_blank\" data-block-id=\"-7\"><span class=\"mceImageBorder\" style=\"border:0;vertical-align:top;margin:0\"><img width=\"24\" height=\"auto\" style=\"width:24px;height:auto;max-width:40px !important;display:block\" alt=\"Instagram icon\" src=\"https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/instagram-icon-light-40.png\" class=\"mceSocialIcon\"/></span></a></td><td style=\"padding-left:30px;padding-top:0;padding-right:30px\" data-breakpoint=\"47\" valign=\"top\" class=\"mobileClass-47\"><a href=\"https://www.linkedin.com/company/symspace\" style=\"display:block\" target=\"_blank\" data-block-id=\"-8\"><span class=\"mceImageBorder\" style=\"border:0;vertical-align:top;margin:0\"><img width=\"24\" height=\"auto\" style=\"width:24px;height:auto;max-width:40px !important;display:block\" alt=\"LinkedIn icon\" src=\"https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/linkedin-icon-light-40.png\" class=\"mceSocialIcon\"/></span></a></td><td style=\"padding-left:30px;padding-top:0;padding-right:30px\" data-breakpoint=\"47\" valign=\"top\" class=\"mobileClass-47\"><a href=\"https://www.youtube.com/@SymspaceLabs\" style=\"display:block\" target=\"_blank\" data-block-id=\"-9\"><span class=\"mceImageBorder\" style=\"border:0;vertical-align:top;margin:0\"><img width=\"24\" height=\"auto\" style=\"width:24px;height:auto;max-width:40px !important;display:block\" alt=\"YouTube icon\" src=\"https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/youtube-icon-light-40.png\" class=\"mceSocialIcon\"/></span></a></td><td style=\"padding-left:30px;padding-top:0;padding-right:30px\" data-breakpoint=\"47\" valign=\"top\" class=\"mobileClass-47\"><a href=\"https://www.symspacelabs.com/\" style=\"display:block\" target=\"_blank\" data-block-id=\"-10\"><span class=\"mceImageBorder\" style=\"border:0;vertical-align:top;margin:0\"><img width=\"24\" height=\"auto\" style=\"width:24px;height:auto;max-width:40px !important;display:block\" alt=\"Website icon\" src=\"https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/website-icon-light-40.png\" class=\"mceSocialIcon\"/></span></a></td><td style=\"padding-left:30px;padding-top:0;padding-right:30px\" data-breakpoint=\"47\" valign=\"top\" class=\"mobileClass-47\"><a href=\"mailto:contact@symspacelabs.com\" style=\"display:block\" target=\"_blank\" data-block-id=\"-11\"><span class=\"mceImageBorder\" style=\"border:0;vertical-align:top;margin:0\"><img width=\"24\" height=\"auto\" style=\"width:24px;height:auto;max-width:40px !important;display:block\" alt=\"Email icon\" src=\"https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/email-icon-light-40.png\" class=\"mceSocialIcon\"/></span></a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style=\"background-color:#1a1a1a;padding-top:10px;padding-bottom:10px;padding-right:10px;padding-left:10px\" class=\"mceLayoutContainer\" valign=\"top\"><table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\" data-block-id=\"26\" id=\"section_043779140768643e646a42d38a88b813\" class=\"mceFooterSection\"><tbody><tr class=\"mceRow\"><td style=\"background-color:#1a1a1a;background-position:center;background-repeat:no-repeat;background-size:cover;padding-top:0px;padding-bottom:0px\" valign=\"top\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"12\" width=\"100%\" role=\"presentation\"><tbody><tr><td style=\"padding-top:0;padding-bottom:0\" class=\"mceColumn\" data-block-id=\"-3\" valign=\"top\" colspan=\"12\" width=\"100%\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\"><tbody><tr><td style=\"padding-top:0;padding-bottom:0;padding-right:0;padding-left:0\" align=\"left\" valign=\"top\"><table width=\"100%\" style=\"border:0;border-collapse:separate\"><tbody><tr><td style=\"padding-left:35px;padding-right:0;padding-top:10px;padding-bottom:20px\" class=\"mceTextBlockContainer\"><div data-block-id=\"24\" class=\"mceText\" id=\"dataBlockId-24\" style=\"width:100%\"><p style=\"line-height: 200%; text-align: center;\">Seller Signup | Email Preferences | Privacy Policy</p><p style=\"line-height: 200%; text-align: center;\">Copyright Symspace Labs Inc. All rights reserved.</p><p style=\"line-height: 200%; text-align: center;\" class=\"last-child\">New York City, NY 10012</p></div></td></tr></tbody></table></td></tr><tr><td class=\"mceLayoutContainer\" align=\"left\" valign=\"top\"><table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" role=\"presentation\" data-block-id=\"-2\"><tbody><tr class=\"mceRow\"><td style=\"background-position:center;background-repeat:no-repeat;background-size:cover;padding-top:0px;padding-bottom:0px\" valign=\"top\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"24\" width=\"100%\" role=\"presentation\"><tbody></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr></tbody></table>\n</td>\n</tr>\n</tbody></table>\n</center>\n<script type=\"text/javascript\"  src=\"/3K853YdSHX3Dvej4To0OcCRQu9M/L9G5SQJtLNSm9pYD/Kg4Rdw/TTB/WB2ovUTw\"></script></body></html>"),
                                    },
                                })];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response];
                        case 2:
                            error_2 = _a.sent();
                            this.logger.error("Failed to send verification email: ".concat(error_2.message));
                            throw error_2;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        MailchimpService_1.prototype.sendEmail = function (email, verificationUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.transactionalClient.messages.send({
                                    key: process.env.MAILCHIMP_TRANSACTIONAL_API_KEY,
                                    message: {
                                        from_email: 'contact@symspacelabs.com',
                                        subject: 'Verify your email address',
                                        to: [{ email: email, type: 'to' }],
                                        html: "<p>Please verify your email by clicking the following link:</p></br><a href=\"".concat(verificationUrl, "\">Click here</a>"),
                                    },
                                })];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response];
                        case 2:
                            error_3 = _a.sent();
                            this.logger.error("Failed to send verification email: ".concat(error_3.message));
                            throw error_3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        MailchimpService_1.prototype.sendPasswordResetEmail = function (email, token) {
            return __awaiter(this, void 0, void 0, function () {
                var resetUrl, message, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resetUrl = "".concat(process.env.FRONTEND_URL, "/reset-password?token=").concat(token);
                            console.log(resetUrl);
                            message = {
                                from_email: 'your-email@example.com',
                                subject: 'Password Reset',
                                html: "Please reset your password by clicking the following link: <a href=\"".concat(resetUrl, "\">Reset Password</a>"),
                                to: [
                                    {
                                        email: email,
                                        type: 'to',
                                    },
                                ],
                            };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            console.error(resetUrl);
                            return [4 /*yield*/, this.transactionalClient.messages.send({ message: message })];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_4 = _a.sent();
                            console.error('Error sending email:', error_4);
                            throw new Error('Error sending email');
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return MailchimpService_1;
    }());
    __setFunctionName(_classThis, "MailchimpService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MailchimpService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MailchimpService = _classThis;
}();
exports.MailchimpService = MailchimpService;
