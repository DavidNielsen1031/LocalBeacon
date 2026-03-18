"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsageMeter = UsageMeter;
var react_1 = require("react");
var link_1 = require("next/link");
function UsageMeter() {
    var _a, _b;
    var _c = (0, react_1.useState)(null), usage = _c[0], setUsage = _c[1];
    (0, react_1.useEffect)(function () {
        fetch("/api/businesses?include=usage")
            .then(function (res) { return res.json(); })
            .then(function (data) {
            if (data.usage)
                setUsage(data.usage);
        })
            .catch(function () { });
    }, []);
    if (!usage || usage.plan !== "free")
        return null;
    return (<div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">
          Your Monthly Limit
        </p>
        <link_1.default href="/pricing" className="text-[#FFD700] text-xs font-semibold hover:underline">
          Upgrade →
        </link_1.default>
      </div>
      <div className="space-y-2">
        <UsageBar label="Google Posts" used={usage.posts.used} limit={(_a = usage.posts.limit) !== null && _a !== void 0 ? _a : 0}/>
        <UsageBar label="City Pages" used={usage.pages.used} limit={(_b = usage.pages.limit) !== null && _b !== void 0 ? _b : 0}/>
      </div>
    </div>);
}
function UsageBar(_a) {
    var label = _a.label, used = _a.used, limit = _a.limit;
    var pct = limit > 0 ? Math.min(100, (used / limit) * 100) : 0;
    var atLimit = used >= limit;
    return (<div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-white/50">{label}</span>
        <span className={atLimit ? "text-red-400 font-semibold" : "text-white/50"}>
          {used}/{limit}
        </span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className={"h-full rounded-full transition-all ".concat(atLimit ? "bg-red-500" : "bg-[#FFD700]")} style={{ width: "".concat(pct, "%") }}/>
      </div>
    </div>);
}
