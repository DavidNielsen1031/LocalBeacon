"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareButtons = ShareButtons;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var ORANGE = "#FF6B35";
var NAVY = "#1B2A4A";
var MIST = "#DFE6E9";
var SLATE = "#636E72";
function ShareButtons(_a) {
    var slug = _a.slug, title = _a.title;
    var _b = (0, react_1.useState)(false), copied = _b[0], setCopied = _b[1];
    var url = "https://localbeacon.ai/blog/".concat(slug);
    function copyLink() {
        navigator.clipboard.writeText(url).then(function () {
            setCopied(true);
            setTimeout(function () { return setCopied(false); }, 2000);
        });
    }
    var twitterUrl = "https://twitter.com/intent/tweet?text=".concat(encodeURIComponent(title), "&url=").concat(encodeURIComponent(url));
    return (<div style={{ display: "flex", gap: "10px" }}>
      <button onClick={copyLink} style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 14px",
            borderRadius: "8px",
            border: "1px solid ".concat(MIST),
            backgroundColor: "#fff",
            color: copied ? ORANGE : SLATE,
            fontSize: "0.8125rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "color 0.15s, border-color 0.15s",
        }}>
        <lucide_react_1.Link2 size={14}/>
        {copied ? "Copied!" : "Copy link"}
      </button>

      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 14px",
            borderRadius: "8px",
            border: "1px solid ".concat(MIST),
            backgroundColor: "#fff",
            color: SLATE,
            fontSize: "0.8125rem",
            fontWeight: 600,
            textDecoration: "none",
            transition: "color 0.15s",
        }}>
        <lucide_react_1.Twitter size={14}/>
        Tweet
      </a>
    </div>);
}
