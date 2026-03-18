"use client";
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
exports.default = DashboardSidebar;
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var nextjs_1 = require("@clerk/nextjs");
var react_1 = require("react");
var business_context_1 = require("@/components/business-context");
var add_client_wizard_1 = require("@/components/add-client-wizard");
var navItems = [
    { href: "/dashboard", label: "Overview", icon: "🏠" },
    { href: "/dashboard/posts", label: "GBP Posts", icon: "📍" },
    { href: "/dashboard/queue", label: "Upcoming Posts", icon: "📅" },
    { href: "/dashboard/pages", label: "Page Builder", icon: "🌐" },
    { href: "/dashboard/reviews", label: "Reviews", icon: "⭐" },
    { href: "/dashboard/blog", label: "Blog Posts", icon: "📝" },
    { href: "/dashboard/ai-readiness", label: "AI Readiness", icon: "🤖" },
    { href: "/dashboard/faq", label: "FAQ Builder", icon: "💬" },
    { href: "/dashboard/llms-txt", label: "AI Discovery File", icon: "📄" },
    { href: "/dashboard/audit", label: "Listing Health", icon: "🩺" },
    { href: "/dashboard/schema", label: "Schema Markup", icon: "🔗" },
    { href: "/dashboard/competitors", label: "Competitors", icon: "🏆" },
    { href: "/dashboard/reports", label: "Your Monthly Report", icon: "📊" },
    { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
];
function DashboardSidebar() {
    var _this = this;
    var pathname = (0, navigation_1.usePathname)();
    var _a = (0, business_context_1.useBusinessContext)(), businesses = _a.businesses, activeBusiness = _a.activeBusiness, switchBusiness = _a.switchBusiness, refreshBusinesses = _a.refreshBusinesses, canAddBusiness = _a.canAddBusiness, businessLimit = _a.businessLimit;
    var _b = (0, react_1.useState)(false), showSwitcher = _b[0], setShowSwitcher = _b[1];
    var _c = (0, react_1.useState)(false), showWizard = _c[0], setShowWizard = _c[1];
    var hasMultipleBusinesses = businesses.length > 1;
    return (<>
      <aside className="w-64 min-h-screen bg-[#111] border-r border-white/10 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <link_1.default href="/" className="flex items-center gap-2">
            <span className="text-xl">🔦</span>
            <span className="font-bold text-[#FFD700] text-lg">
              LocalBeacon.ai
            </span>
          </link_1.default>
        </div>

        {/* Client Switcher */}
        {businesses.length > 0 && (<div className="px-3 py-3 border-b border-white/10">
            <button onClick={function () { return setShowSwitcher(!showSwitcher); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left">
              <span className="text-lg">🏢</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {(activeBusiness === null || activeBusiness === void 0 ? void 0 : activeBusiness.name) || "Select business"}
                </p>
                <p className="text-xs text-white/40 truncate">
                  {activeBusiness
                ? "".concat(activeBusiness.primary_city, ", ").concat(activeBusiness.primary_state)
                : "No business selected"}
                </p>
              </div>
              {(hasMultipleBusinesses || canAddBusiness) && (<span className={"text-white/40 text-xs transition-transform ".concat(showSwitcher ? "rotate-180" : "")}>
                  ▾
                </span>)}
            </button>

            {/* Dropdown */}
            {showSwitcher && (<div className="mt-1 space-y-1">
                {businesses.map(function (biz) { return (<button key={biz.id} onClick={function () {
                        switchBusiness(biz.id);
                        setShowSwitcher(false);
                    }} className={"w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ".concat(biz.id === (activeBusiness === null || activeBusiness === void 0 ? void 0 : activeBusiness.id)
                        ? "bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20"
                        : "text-white/60 hover:text-white hover:bg-white/5")}>
                    <span className="text-xs">
                      {biz.id === (activeBusiness === null || activeBusiness === void 0 ? void 0 : activeBusiness.id) ? "●" : "○"}
                    </span>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="truncate font-medium">{biz.name}</p>
                      <p className="text-xs opacity-60 truncate">
                        {biz.primary_city}, {biz.primary_state}
                      </p>
                    </div>
                  </button>); })}

                {/* Add Client button */}
                {canAddBusiness ? (<button onClick={function () {
                        setShowSwitcher(false);
                        setShowWizard(true);
                    }} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#FFD700]/70 hover:text-[#FFD700] hover:bg-[#FFD700]/5 transition-colors">
                    <span className="text-base">+</span>
                    <span>Add Client</span>
                  </button>) : (<div className="px-3 py-2 text-xs text-white/30">
                    {businessLimit} business{businessLimit === 1 ? "" : "es"} max
                    on your plan.{" "}
                    <link_1.default href="/pricing" className="text-[#FFD700]/60 hover:text-[#FFD700] underline">
                      Upgrade
                    </link_1.default>
                  </div>)}
              </div>)}
          </div>)}

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map(function (item) {
            var isActive = item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (<li key={item.href}>
                  <link_1.default href={item.href} className={"flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ".concat(isActive
                    ? "bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20"
                    : "text-white/60 hover:text-white hover:bg-white/5")}>
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </link_1.default>
                </li>);
        })}
          </ul>
        </nav>

        {/* User section */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center gap-3">
          <nextjs_1.UserButton appearance={{
            elements: {
                avatarBox: "w-8 h-8",
            },
        }}/>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/40 truncate">Signed in</p>
          </div>
        </div>
      </aside>

      {/* Add Client Wizard */}
      <add_client_wizard_1.AddClientWizard open={showWizard} onOpenChange={setShowWizard} onComplete={function (businessId) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, refreshBusinesses()];
                    case 1:
                        _a.sent();
                        switchBusiness(businessId);
                        setShowWizard(false);
                        return [2 /*return*/];
                }
            });
        }); }}/>
    </>);
}
