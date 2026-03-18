"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
var blog_1 = require("@/lib/blog");
var landing_content_1 = require("@/components/landing-content");
function Home() {
    var latestPosts = (0, blog_1.getAllPosts)().slice(0, 3);
    return <landing_content_1.default latestPosts={latestPosts}/>;
}
