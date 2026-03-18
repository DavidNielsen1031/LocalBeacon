"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.default = SettingsPage;
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var textarea_1 = require("@/components/ui/textarea");
function SettingsPage() {
    var _this = this;
    var _a = (0, react_1.useState)(false), saving = _a[0], setSaving = _a[1];
    var _b = (0, react_1.useState)(false), saved = _b[0], setSaved = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        website: "",
        description: "",
        service_areas: "",
        specialties: "",
    }), form = _d[0], setForm = _d[1];
    (0, react_1.useEffect)(function () {
        // Load existing business data
        fetch("/api/businesses")
            .then(function (res) { return res.json(); })
            .then(function (data) {
            if (data.business) {
                setForm({
                    name: data.business.name || "",
                    phone: data.business.phone || "",
                    address: data.business.address || "",
                    city: data.business.city || "",
                    state: data.business.state || "",
                    zip: data.business.zip || "",
                    website: data.business.website || "",
                    description: data.business.description || "",
                    service_areas: data.business.service_areas || "",
                    specialties: data.business.specialties || "",
                });
            }
        })
            .catch(function () { })
            .finally(function () { return setLoading(false); });
    }, []);
    var handleSave = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setSaving(true);
                    setSaved(false);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, fetch("/api/businesses", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(form),
                        })];
                case 2:
                    res = _b.sent();
                    if (res.ok) {
                        setSaved(true);
                        setTimeout(function () { return setSaved(false); }, 3000);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    _a = _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    setSaving(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var update = function (field, value) {
        setForm(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    return (<div className="flex-1 px-6 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-white/50 mt-1 text-sm">
          Your business details are used to personalize all generated content.
        </p>
      </div>

      {/* Business Info */}
      <card_1.Card className="bg-white/5 border-white/10 mb-6">
        <card_1.CardHeader>
          <card_1.CardTitle className="text-white text-base">Business Information</card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          <div>
            <label_1.Label className="text-white/70 text-sm mb-1.5 block">Business Name</label_1.Label>
            <input_1.Input value={form.name} onChange={function (e) { return update("name", e.target.value); }} placeholder="Mike's Plumbing" className="bg-white/5 border-white/20 text-white placeholder:text-white/30" disabled={loading}/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label_1.Label className="text-white/70 text-sm mb-1.5 block">Phone</label_1.Label>
              <input_1.Input value={form.phone} onChange={function (e) { return update("phone", e.target.value); }} placeholder="(555) 123-4567" className="bg-white/5 border-white/20 text-white placeholder:text-white/30" disabled={loading}/>
            </div>
            <div>
              <label_1.Label className="text-white/70 text-sm mb-1.5 block">Website</label_1.Label>
              <input_1.Input value={form.website} onChange={function (e) { return update("website", e.target.value); }} placeholder="https://yourbusiness.com" className="bg-white/5 border-white/20 text-white placeholder:text-white/30" disabled={loading}/>
            </div>
          </div>
          <div>
            <label_1.Label className="text-white/70 text-sm mb-1.5 block">Street Address</label_1.Label>
            <input_1.Input value={form.address} onChange={function (e) { return update("address", e.target.value); }} placeholder="123 Main St" className="bg-white/5 border-white/20 text-white placeholder:text-white/30" disabled={loading}/>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label_1.Label className="text-white/70 text-sm mb-1.5 block">City</label_1.Label>
              <input_1.Input value={form.city} onChange={function (e) { return update("city", e.target.value); }} placeholder="Denver" className="bg-white/5 border-white/20 text-white placeholder:text-white/30" disabled={loading}/>
            </div>
            <div>
              <label_1.Label className="text-white/70 text-sm mb-1.5 block">State</label_1.Label>
              <input_1.Input value={form.state} onChange={function (e) { return update("state", e.target.value); }} placeholder="CO" className="bg-white/5 border-white/20 text-white placeholder:text-white/30" disabled={loading}/>
            </div>
            <div>
              <label_1.Label className="text-white/70 text-sm mb-1.5 block">ZIP</label_1.Label>
              <input_1.Input value={form.zip} onChange={function (e) { return update("zip", e.target.value); }} placeholder="80202" className="bg-white/5 border-white/20 text-white placeholder:text-white/30" disabled={loading}/>
            </div>
          </div>
          <div>
            <label_1.Label className="text-white/70 text-sm mb-1.5 block">Business Description</label_1.Label>
            <textarea_1.Textarea value={form.description} onChange={function (e) { return update("description", e.target.value); }} placeholder="Describe what your business does, who you serve, and what makes you different..." className="bg-white/5 border-white/20 text-white placeholder:text-white/30 min-h-[80px]" disabled={loading}/>
          </div>
          <div>
            <label_1.Label className="text-white/70 text-sm mb-1.5 block">Service Areas</label_1.Label>
            <input_1.Input value={form.service_areas} onChange={function (e) { return update("service_areas", e.target.value); }} placeholder="Denver, Lakewood, Aurora, Arvada" className="bg-white/5 border-white/20 text-white placeholder:text-white/30" disabled={loading}/>
            <p className="text-white/30 text-xs mt-1">Comma-separated cities or neighborhoods</p>
          </div>
          <div>
            <label_1.Label className="text-white/70 text-sm mb-1.5 block">Specialties</label_1.Label>
            <input_1.Input value={form.specialties} onChange={function (e) { return update("specialties", e.target.value); }} placeholder="Emergency plumbing, drain cleaning, water heater installation" className="bg-white/5 border-white/20 text-white placeholder:text-white/30" disabled={loading}/>
            <p className="text-white/30 text-xs mt-1">Comma-separated services you offer</p>
          </div>
          <div className="flex items-center gap-3">
            <button_1.Button onClick={handleSave} disabled={saving || loading} className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold text-sm">
              {saving ? "Saving..." : "Save Changes"}
            </button_1.Button>
            {saved && (<span className="text-green-400 text-sm">✓ Saved</span>)}
          </div>
        </card_1.CardContent>
      </card_1.Card>

      {/* Subscription */}
      <card_1.Card className="bg-white/5 border-white/10">
        <card_1.CardHeader>
          <card_1.CardTitle className="text-white text-base flex items-center gap-2">
            Subscription
            <badge_1.Badge className="bg-white/10 text-white/60 border-white/20 text-xs">
              Free Plan
            </badge_1.Badge>
          </card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          <p className="text-white/50 text-sm mb-4">
            You are on the Free plan. Upgrade to unlock unlimited post drafts, AI review replies,
            and full AI Readiness recommendations.
          </p>
          <button_1.Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold text-sm">
            Upgrade to Solo — $49/month
          </button_1.Button>
        </card_1.CardContent>
      </card_1.Card>
    </div>);
}
