"use client";
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
exports.BlogFilters = BlogFilters;
var react_1 = require("react");
var link_1 = require("next/link");
var blog_shared_1 = require("@/lib/blog-shared");
var ORANGE = "#FF6B35";
var NAVY = "#1B2A4A";
var SLATE = "#636E72";
var MIST = "#DFE6E9";
var POSTS_PER_PAGE = 12;
var ALL_CATEGORIES = __spreadArray([
    { key: "all", label: "All" }
], Object.entries(blog_shared_1.CATEGORY_LABELS).map(function (_a) {
    var key = _a[0], label = _a[1];
    return ({ key: key, label: label });
}), true);
function BlogFilters(_a) {
    var posts = _a.posts;
    var _b = (0, react_1.useState)("all"), activeCategory = _b[0], setActiveCategory = _b[1];
    var _c = (0, react_1.useState)(1), page = _c[0], setPage = _c[1];
    var filtered = activeCategory === "all"
        ? posts
        : posts.filter(function (p) { return p.category === activeCategory; });
    var totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
    var paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
    function handleCategory(key) {
        setActiveCategory(key);
        setPage(1);
    }
    return (<>
      {/* Category tabs */}
      <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "40px",
            justifyContent: "center",
        }}>
        {ALL_CATEGORIES.map(function (_a) {
            var key = _a.key, label = _a.label;
            return (<button key={key} onClick={function () { return handleCategory(key); }} style={{
                    padding: "8px 18px",
                    borderRadius: "9999px",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: activeCategory === key ? ORANGE : "".concat(MIST),
                    color: activeCategory === key ? "#fff" : SLATE,
                    transition: "background-color 0.15s, color 0.15s",
                }}>
            {label}
          </button>);
        })}
      </div>

      {/* Posts grid */}
      {paginated.length === 0 ? (<p style={{ textAlign: "center", color: SLATE, padding: "48px 0" }}>
          No posts in this category yet. Check back soon!
        </p>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map(function (post) { return (<PostCardClient key={post.slug} post={post}/>); })}
        </div>)}

      {/* Pagination */}
      {totalPages > 1 && (<div style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                marginTop: "48px",
            }}>
          {Array.from({ length: totalPages }, function (_, i) { return i + 1; }).map(function (p) { return (<button key={p} onClick={function () {
                    setPage(p);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }} style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    border: page === p ? "none" : "1px solid ".concat(MIST),
                    backgroundColor: page === p ? ORANGE : "#fff",
                    color: page === p ? "#fff" : SLATE,
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    transition: "background-color 0.15s",
                }}>
              {p}
            </button>); })}
        </div>)}
    </>);
}
function PostCardClient(_a) {
    var _b;
    var post = _a.post;
    var categoryLabel = (_b = blog_shared_1.CATEGORY_LABELS[post.category]) !== null && _b !== void 0 ? _b : post.category;
    return (<link_1.default href={"/blog/".concat(post.slug)} style={{ textDecoration: "none", display: "block" }}>
      <article style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            border: "1px solid ".concat(MIST),
            padding: "28px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            transition: "box-shadow 0.2s, border-color 0.2s",
        }} className="hover-card">
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          <span style={{
            backgroundColor: "".concat(ORANGE, "15"),
            color: ORANGE,
            fontSize: "0.75rem",
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: "9999px",
        }}>
            {categoryLabel}
          </span>
          <span style={{ color: SLATE, fontSize: "0.8125rem" }}>{post.readingTime} min read</span>
        </div>
        <h2 style={{
            color: NAVY,
            fontSize: "1.125rem",
            fontWeight: 700,
            lineHeight: 1.35,
            marginBottom: "10px",
            letterSpacing: "-0.01em",
        }}>
          {post.title}
        </h2>
        <p style={{
            color: SLATE,
            fontSize: "0.9375rem",
            lineHeight: 1.55,
            flex: 1,
            marginBottom: "16px",
        }}>
          {post.description}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <time dateTime={post.date} style={{ color: SLATE, fontSize: "0.8125rem", opacity: 0.7 }}>
            {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })}
          </time>
          <span style={{ color: ORANGE, fontSize: "0.875rem", fontWeight: 600 }}>Read more →</span>
        </div>
      </article>
    </link_1.default>);
}
