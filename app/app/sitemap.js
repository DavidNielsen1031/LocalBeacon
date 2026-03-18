"use strict";
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
exports.default = sitemap;
var industry_data_1 = require("@/lib/industry-data");
var blog_1 = require("@/lib/blog");
function sitemap() {
    var blogPosts = (0, blog_1.getAllPosts)();
    return __spreadArray(__spreadArray(__spreadArray([
        {
            url: 'https://localbeacon.ai',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://localbeacon.ai/check',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: 'https://localbeacon.ai/pricing',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://localbeacon.ai/blog',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        }
    ], blogPosts.map(function (post) { return ({
        url: "https://localbeacon.ai/blog/".concat(post.slug),
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
    }); }), true), industry_data_1.industrySlugs.map(function (slug) { return ({
        url: "https://localbeacon.ai/for/".concat(slug),
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }); }), true), [
        {
            url: 'https://localbeacon.ai/privacy',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: 'https://localbeacon.ai/terms',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.3,
        },
    ], false);
}
