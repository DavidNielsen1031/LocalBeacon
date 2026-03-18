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
exports.dynamic = void 0;
exports.default = DashboardLayout;
exports.dynamic = 'force-dynamic';
var server_1 = require("@clerk/nextjs/server");
var navigation_1 = require("next/navigation");
var sidebar_1 = require("@/components/dashboard/sidebar");
var degraded_banner_1 = require("@/components/degraded-banner");
var business_context_1 = require("@/components/business-context");
var supabase_1 = require("@/lib/supabase");
function getBusinessesForUser(clerkUserId) {
    return __awaiter(this, void 0, void 0, function () {
        var supabase, user, plan, businesses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    supabase = (0, supabase_1.createServerClient)();
                    if (!supabase)
                        return [2 /*return*/, { businesses: [], plan: "free" }];
                    return [4 /*yield*/, supabase
                            .from("users")
                            .select("id, plan")
                            .eq("clerk_id", clerkUserId)
                            .single()];
                case 1:
                    user = (_a.sent()).data;
                    if (!user)
                        return [2 /*return*/, { businesses: [], plan: "free" }];
                    plan = (user.plan || "free").toLowerCase();
                    return [4 /*yield*/, supabase
                            .from("businesses")
                            .select("id, name, category, primary_city, primary_state, service_areas, phone, website, gbp_connected, address, zip, description, specialties")
                            .eq("user_id", user.id)
                            .order("created_at", { ascending: true })];
                case 2:
                    businesses = (_a.sent()).data;
                    return [2 /*return*/, { businesses: businesses || [], plan: plan }];
            }
        });
    });
}
function DashboardLayout(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var userId, _c, businesses, plan;
        var _d;
        var children = _b.children;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, (0, server_1.auth)()];
                case 1:
                    userId = (_e.sent()).userId;
                    if (!userId) {
                        (0, navigation_1.redirect)("/sign-in");
                    }
                    return [4 /*yield*/, getBusinessesForUser(userId)];
                case 2:
                    _c = _e.sent(), businesses = _c.businesses, plan = _c.plan;
                    return [2 /*return*/, (<business_context_1.BusinessProvider initialBusinesses={businesses} initialActiveId={((_d = businesses[0]) === null || _d === void 0 ? void 0 : _d.id) || null} plan={plan}>
      <div className="flex min-h-screen bg-black text-white">
        <sidebar_1.default />
        <main className="flex-1 flex flex-col min-h-screen">
          <degraded_banner_1.DegradedBanner />
          {children}
        </main>
      </div>
    </business_context_1.BusinessProvider>)];
            }
        });
    });
}
