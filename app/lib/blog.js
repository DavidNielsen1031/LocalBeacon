"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORY_LABELS = void 0;
exports.getAllPosts = getAllPosts;
exports.getPostBySlug = getPostBySlug;
exports.getAllSlugs = getAllSlugs;
exports.getRelatedPosts = getRelatedPosts;
var fs_1 = require("fs");
var path_1 = require("path");
var gray_matter_1 = require("gray-matter");
var remark_1 = require("remark");
var remark_html_1 = require("remark-html");
var blog_shared_1 = require("./blog-shared");
Object.defineProperty(exports, "CATEGORY_LABELS", { enumerable: true, get: function () { return blog_shared_1.CATEGORY_LABELS; } });
var BLOG_DIR = path_1.default.join(process.cwd(), 'content', 'blog');
function calculateReadingTime(content) {
    var words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 225));
}
function getAllPosts() {
    if (!fs_1.default.existsSync(BLOG_DIR))
        return [];
    var files = fs_1.default.readdirSync(BLOG_DIR).filter(function (f) { return f.endsWith('.md'); });
    var posts = files.map(function (filename) {
        var _a, _b, _c, _d, _e, _f;
        var slug = filename.replace(/\.md$/, '');
        var raw = fs_1.default.readFileSync(path_1.default.join(BLOG_DIR, filename), 'utf-8');
        var _g = (0, gray_matter_1.default)(raw), data = _g.data, content = _g.content;
        return {
            slug: slug,
            title: (_a = data.title) !== null && _a !== void 0 ? _a : '',
            date: (_b = data.date) !== null && _b !== void 0 ? _b : '',
            description: (_c = data.description) !== null && _c !== void 0 ? _c : '',
            category: (_d = data.category) !== null && _d !== void 0 ? _d : 'seo',
            industry: (_e = data.industry) !== null && _e !== void 0 ? _e : 'general',
            author: (_f = data.author) !== null && _f !== void 0 ? _f : 'LocalBeacon Team',
            readingTime: calculateReadingTime(content),
        };
    });
    return posts.sort(function (a, b) { return (a.date > b.date ? -1 : 1); });
}
function getPostBySlug(slug) {
    return __awaiter(this, void 0, void 0, function () {
        var filePath, raw, _a, data, content, result;
        var _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    filePath = path_1.default.join(BLOG_DIR, "".concat(slug, ".md"));
                    if (!fs_1.default.existsSync(filePath))
                        return [2 /*return*/, null];
                    raw = fs_1.default.readFileSync(filePath, 'utf-8');
                    _a = (0, gray_matter_1.default)(raw), data = _a.data, content = _a.content;
                    return [4 /*yield*/, (0, remark_1.remark)().use(remark_html_1.default).process(content)];
                case 1:
                    result = _h.sent();
                    return [2 /*return*/, {
                            slug: slug,
                            title: (_b = data.title) !== null && _b !== void 0 ? _b : '',
                            date: (_c = data.date) !== null && _c !== void 0 ? _c : '',
                            description: (_d = data.description) !== null && _d !== void 0 ? _d : '',
                            category: (_e = data.category) !== null && _e !== void 0 ? _e : 'seo',
                            industry: (_f = data.industry) !== null && _f !== void 0 ? _f : 'general',
                            author: (_g = data.author) !== null && _g !== void 0 ? _g : 'LocalBeacon Team',
                            content: result.toString(),
                            readingTime: calculateReadingTime(content),
                        }];
            }
        });
    });
}
function getAllSlugs() {
    if (!fs_1.default.existsSync(BLOG_DIR))
        return [];
    return fs_1.default.readdirSync(BLOG_DIR)
        .filter(function (f) { return f.endsWith('.md'); })
        .map(function (f) { return f.replace(/\.md$/, ''); });
}
function getRelatedPosts(currentSlug, category, limit) {
    if (limit === void 0) { limit = 3; }
    var all = getAllPosts();
    var sameCategory = all.filter(function (p) { return p.slug !== currentSlug && p.category === category; });
    var others = all.filter(function (p) { return p.slug !== currentSlug && p.category !== category; });
    return __spreadArray(__spreadArray([], sameCategory, true), others, true).slice(0, limit);
}
