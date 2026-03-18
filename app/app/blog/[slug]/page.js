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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStaticParams = generateStaticParams;
exports.generateMetadata = generateMetadata;
exports.default = BlogPostPage;
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var blog_1 = require("@/lib/blog");
var site_nav_1 = require("@/components/site-nav");
var site_footer_1 = require("@/components/site-footer");
var share_buttons_1 = require("./share-buttons");
var ORANGE = "#FF6B35";
var NAVY = "#1B2A4A";
var CREAM = "#FFF8F0";
var WARM_WHITE = "#FAFAF7";
var CHARCOAL = "#2D3436";
var SLATE = "#636E72";
var MIST = "#DFE6E9";
function generateStaticParams() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, blog_1.getAllSlugs)().map(function (slug) { return ({ slug: slug }); })];
        });
    });
}
function generateMetadata(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var slug, post;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, params];
                case 1:
                    slug = (_c.sent()).slug;
                    return [4 /*yield*/, (0, blog_1.getPostBySlug)(slug)];
                case 2:
                    post = _c.sent();
                    if (!post)
                        return [2 /*return*/, {}];
                    return [2 /*return*/, {
                            title: "".concat(post.title, " \u2014 LocalBeacon.ai"),
                            description: post.description,
                            openGraph: {
                                title: post.title,
                                description: post.description,
                                url: "https://localbeacon.ai/blog/".concat(post.slug),
                                siteName: "LocalBeacon.ai",
                                type: "article",
                                publishedTime: post.date,
                                authors: [post.author],
                            },
                            twitter: {
                                card: "summary_large_image",
                                title: post.title,
                                description: post.description,
                            },
                            alternates: { canonical: "https://localbeacon.ai/blog/".concat(post.slug) },
                        }];
            }
        });
    });
}
function BlogPostPage(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var slug, post, related, categoryLabel, publishDate, articleSchema, breadcrumbSchema;
        var _c;
        var params = _b.params;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, params];
                case 1:
                    slug = (_d.sent()).slug;
                    return [4 /*yield*/, (0, blog_1.getPostBySlug)(slug)];
                case 2:
                    post = _d.sent();
                    if (!post)
                        (0, navigation_1.notFound)();
                    related = (0, blog_1.getRelatedPosts)(post.slug, post.category, 3);
                    categoryLabel = (_c = blog_1.CATEGORY_LABELS[post.category]) !== null && _c !== void 0 ? _c : post.category;
                    publishDate = new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    });
                    articleSchema = {
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: post.title,
                        description: post.description,
                        datePublished: post.date,
                        dateModified: post.date,
                        author: {
                            "@type": "Organization",
                            name: post.author,
                            url: "https://localbeacon.ai",
                        },
                        publisher: {
                            "@type": "Organization",
                            name: "LocalBeacon.ai",
                            url: "https://localbeacon.ai",
                            logo: {
                                "@type": "ImageObject",
                                url: "https://localbeacon.ai/logo-192.png",
                            },
                        },
                        mainEntityOfPage: {
                            "@type": "WebPage",
                            "@id": "https://localbeacon.ai/blog/".concat(post.slug),
                        },
                        wordCount: post.content.split(/\s+/).length,
                        articleSection: categoryLabel,
                    };
                    breadcrumbSchema = {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            { "@type": "ListItem", position: 1, name: "Home", item: "https://localbeacon.ai" },
                            { "@type": "ListItem", position: 2, name: "Blog", item: "https://localbeacon.ai/blog" },
                            { "@type": "ListItem", position: 3, name: post.title, item: "https://localbeacon.ai/blog/".concat(post.slug) },
                        ],
                    };
                    return [2 /*return*/, (<div style={{ backgroundColor: WARM_WHITE, color: CHARCOAL, fontFamily: "var(--font-dm-sans), sans-serif", minHeight: "100vh" }}>
      <site_nav_1.SiteNav />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}/>

      <style dangerouslySetInnerHTML={{
                                __html: "\n            .blog-content h2 { color: ".concat(NAVY, "; font-weight: 700; font-size: 1.5rem; margin: 2.5rem 0 1rem; letter-spacing: -0.01em; line-height: 1.3; }\n            .blog-content h3 { color: ").concat(NAVY, "; font-weight: 700; font-size: 1.2rem; margin: 2rem 0 0.75rem; line-height: 1.35; }\n            .blog-content p { color: ").concat(CHARCOAL, "; font-size: 1.0625rem; line-height: 1.75; margin: 0 0 1.25rem; }\n            .blog-content ul, .blog-content ol { color: ").concat(CHARCOAL, "; font-size: 1.0625rem; line-height: 1.75; margin: 0 0 1.25rem; padding-left: 1.5rem; }\n            .blog-content li { margin-bottom: 0.5rem; }\n            .blog-content strong { color: ").concat(NAVY, "; font-weight: 700; }\n            .blog-content a { color: ").concat(ORANGE, "; text-decoration: underline; text-underline-offset: 2px; }\n            .blog-content a:hover { opacity: 0.8; }\n            .blog-content blockquote { border-left: 3px solid ").concat(ORANGE, "; padding: 1rem 1.25rem; margin: 1.5rem 0; background: ").concat(CREAM, "; border-radius: 0 8px 8px 0; }\n            .blog-content blockquote p { margin: 0; color: ").concat(NAVY, "; }\n            .blog-content hr { border: none; border-top: 1px solid ").concat(MIST, "; margin: 2.5rem 0; }\n            .blog-content code { background: ").concat(CREAM, "; padding: 2px 6px; border-radius: 4px; font-size: 0.9375rem; }\n            .blog-content pre { background: ").concat(NAVY, "; color: #e2e8f0; padding: 1.25rem; border-radius: 8px; overflow-x: auto; margin: 1.5rem 0; }\n            .blog-content pre code { background: transparent; padding: 0; color: inherit; }\n            .blog-content table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9375rem; }\n            .blog-content th { text-align: left; padding: 12px 16px; background: ").concat(CREAM, "; color: ").concat(NAVY, "; font-weight: 700; border-bottom: 2px solid ").concat(MIST, "; }\n            .blog-content td { padding: 12px 16px; border-bottom: 1px solid ").concat(MIST, "; color: ").concat(CHARCOAL, "; }\n            .related-card:hover { box-shadow: 0 8px 24px rgba(27,42,74,0.08) !important; border-color: ").concat(ORANGE, "40 !important; }\n          "),
                            }}/>

      <article style={{ padding: "48px 24px 0" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          {/* Breadcrumbs */}
          <nav style={{ marginBottom: "24px", fontSize: "0.875rem" }}>
            <link_1.default href="/" style={{ color: SLATE, textDecoration: "none" }}>Home</link_1.default>
            <span style={{ color: MIST, margin: "0 8px" }}>/</span>
            <link_1.default href="/blog" style={{ color: SLATE, textDecoration: "none" }}>Blog</link_1.default>
            <span style={{ color: MIST, margin: "0 8px" }}>/</span>
            <span style={{ color: CHARCOAL }}>{post.title}</span>
          </nav>

          {/* Header */}
          <header style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
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
              <span style={{ color: SLATE, fontSize: "0.8125rem" }}>
                {post.readingTime} min read
              </span>
            </div>

            <h1 style={{
                                fontWeight: 800,
                                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                                color: NAVY,
                                letterSpacing: "-0.02em",
                                lineHeight: 1.2,
                                marginBottom: "16px",
                            }}>
              {post.title}
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", color: SLATE, fontSize: "0.9375rem" }}>
              <span>{post.author}</span>
              <span style={{ opacity: 0.3 }}>·</span>
              <time dateTime={post.date}>{publishDate}</time>
            </div>
          </header>

          {/* Body */}
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }}/>

          {/* Share */}
          <div style={{
                                borderTop: "1px solid ".concat(MIST),
                                borderBottom: "1px solid ".concat(MIST),
                                padding: "24px 0",
                                margin: "40px 0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                gap: "16px",
                            }}>
            <span style={{ color: NAVY, fontWeight: 600, fontSize: "0.9375rem" }}>
              Share this article
            </span>
            <share_buttons_1.ShareButtons slug={post.slug} title={post.title}/>
          </div>
        </div>
      </article>

      {/* CTA Banner */}
      <section style={{
                                backgroundColor: NAVY,
                                padding: "56px 24px",
                                textAlign: "center",
                            }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{
                                fontWeight: 800,
                                fontSize: "clamp(1.375rem, 3vw, 1.75rem)",
                                color: "#fff",
                                letterSpacing: "-0.01em",
                                marginBottom: "12px",
                            }}>
            Check your AI readiness score — free
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.6, marginBottom: "24px" }}>
            See how visible your business is to AI search engines. Takes 2 minutes.
          </p>
          <link_1.default href="/check" style={{ textDecoration: "none" }}>
            <button style={{
                                backgroundColor: ORANGE,
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: "1rem",
                                padding: "13px 28px",
                                borderRadius: "8px",
                                border: "none",
                                cursor: "pointer",
                                boxShadow: "0 4px 14px rgba(255,107,53,0.4)",
                            }}>
              Run Free AI Check →
            </button>
          </link_1.default>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (<section style={{ padding: "72px 24px", backgroundColor: CREAM }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2 style={{
                                    fontWeight: 800,
                                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                                    color: NAVY,
                                    letterSpacing: "-0.02em",
                                    marginBottom: "36px",
                                    textAlign: "center",
                                }}>
              Keep reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(function (rp) {
                                    var _a;
                                    var rpCategory = (_a = blog_1.CATEGORY_LABELS[rp.category]) !== null && _a !== void 0 ? _a : rp.category;
                                    return (<link_1.default key={rp.slug} href={"/blog/".concat(rp.slug)} style={{ textDecoration: "none", display: "block" }}>
                    <div className="related-card" style={{
                                            backgroundColor: "#fff",
                                            borderRadius: "12px",
                                            border: "1px solid ".concat(MIST),
                                            padding: "24px",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            transition: "box-shadow 0.2s, border-color 0.2s",
                                        }}>
                      <span style={{
                                            backgroundColor: "".concat(ORANGE, "15"),
                                            color: ORANGE,
                                            fontSize: "0.75rem",
                                            fontWeight: 600,
                                            padding: "4px 10px",
                                            borderRadius: "9999px",
                                            alignSelf: "flex-start",
                                            marginBottom: "12px",
                                        }}>
                        {rpCategory}
                      </span>
                      <h3 style={{
                                            color: NAVY,
                                            fontSize: "1.0625rem",
                                            fontWeight: 700,
                                            lineHeight: 1.35,
                                            marginBottom: "8px",
                                        }}>
                        {rp.title}
                      </h3>
                      <p style={{ color: SLATE, fontSize: "0.875rem", lineHeight: 1.5, flex: 1 }}>
                        {rp.description}
                      </p>
                    </div>
                  </link_1.default>);
                                })}
            </div>
          </div>
        </section>)}

      <site_footer_1.SiteFooter />
    </div>)];
            }
        });
    });
}
