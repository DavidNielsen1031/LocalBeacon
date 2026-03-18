"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendations = getRecommendations;
var aeo_rules_json_1 = require("./aeo-rules.json");
var RECOMMENDATION_MAP = {
    llms_txt: {
        description: 'Create an AI discovery file so search engines understand your business.',
        ctaLabel: 'Create AI File',
        ctaUrl: '/dashboard/llms-txt',
    },
    robots_txt: {
        description: 'AI crawlers like GPTBot can\'t access your site. Allow them to find you.',
        ctaLabel: 'Learn How',
        ctaUrl: 'https://developers.google.com/search/docs/crawling-indexing/robots/intro',
    },
    schema_markup: {
        description: 'Add structured data so search engines and AI can read your business info.',
        ctaLabel: 'Add Schema',
        ctaUrl: '/dashboard/schema',
    },
    faq_content: {
        description: 'AI engines heavily cite FAQ pages. Create FAQ content for your business.',
        ctaLabel: 'Build FAQs',
        ctaUrl: '/dashboard/faq',
    },
    https: {
        description: 'Your site isn\'t secure. HTTPS is required for AI trust.',
        ctaLabel: 'Learn How',
        ctaUrl: 'https://letsencrypt.org/getting-started/',
    },
    open_graph: {
        description: 'Add preview tags so AI and social platforms show your business correctly.',
        ctaLabel: 'Learn How',
        ctaUrl: 'https://ogp.me/',
    },
    mobile: {
        description: 'Your site isn\'t mobile-friendly. AI prefers mobile-optimized sources.',
        ctaLabel: 'Learn How',
        ctaUrl: 'https://web.dev/responsive-web-design-basics/',
    },
    sitemap: {
        description: 'No sitemap found. AI crawlers use sitemaps to discover all your pages.',
        ctaLabel: 'Learn How',
        ctaUrl: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap',
    },
    headings: {
        description: 'Improve your heading structure for better AI readability.',
        ctaLabel: 'Learn How',
        ctaUrl: 'https://web.dev/learn/html/headings-and-sections',
    },
    service_pages: {
        description: 'Create city-specific pages so AI can recommend you for local searches.',
        ctaLabel: 'Create Pages',
        ctaUrl: '/dashboard/pages',
    },
    freshness: {
        description: 'Your content needs updating. AI engines prefer fresh, current sources.',
        ctaLabel: 'Create Post',
        ctaUrl: '/dashboard/queue',
    },
    reviews: {
        description: 'Add reviews to your site. AI cites businesses with social proof.',
        ctaLabel: 'Manage Reviews',
        ctaUrl: '/dashboard/reviews',
    },
    answer_first: {
        description: 'Structure content with direct answers first — AI extracts the first relevant passage.',
        ctaLabel: 'Write Blog Post',
        ctaUrl: '/dashboard/blog',
    },
    nap: {
        description: 'Make your business name, address, and phone clearly visible and consistent.',
        ctaLabel: 'Update Settings',
        ctaUrl: '/dashboard/settings',
    },
};
function getPriority(weight) {
    if (weight >= 8)
        return 'critical';
    if (weight >= 5)
        return 'important';
    return 'nice-to-have';
}
/**
 * Given a map of signal IDs to pass/fail booleans,
 * returns recommendations for failing signals, sorted by weight.
 */
function getRecommendations(signals) {
    var recommendations = [];
    var _loop_1 = function (signalId, passed) {
        if (passed)
            return "continue";
        var rule = aeo_rules_json_1.default.rules.find(function (r) { return r.id === signalId; });
        var mapping = RECOMMENDATION_MAP[signalId];
        if (!rule || !mapping)
            return "continue";
        recommendations.push({
            signalId: signalId,
            priority: getPriority(rule.weight),
            title: rule.label,
            description: mapping.description,
            ctaLabel: mapping.ctaLabel,
            ctaUrl: mapping.ctaUrl,
            isInternal: mapping.ctaUrl.startsWith('/'),
            weight: rule.weight,
        });
    };
    for (var _i = 0, _a = Object.entries(signals); _i < _a.length; _i++) {
        var _b = _a[_i], signalId = _b[0], passed = _b[1];
        _loop_1(signalId, passed);
    }
    // Sort: critical first, then important, then nice-to-have (within each: by weight desc)
    return recommendations.sort(function (a, b) { return b.weight - a.weight; });
}
