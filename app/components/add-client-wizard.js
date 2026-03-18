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
exports.AddClientWizard = AddClientWizard;
var React = require("react");
var dialog_1 = require("@/components/ui/dialog");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var CATEGORIES = [
    "Plumber",
    "HVAC",
    "Dentist",
    "Roofer",
    "Lawyer",
    "Landscaper",
    "Auto Repair",
    "Electrician",
    "Other",
];
var SPECIALTIES_MAP = {
    Plumber: "drain cleaning, water heater, leak repair, sewer line, faucet repair",
    HVAC: "AC repair, furnace, heat pump, ductwork, thermostat",
    Dentist: "cleaning, fillings, crowns, whitening, implants",
    Roofer: "roof repair, replacement, inspection, gutters, siding",
    Lawyer: "personal injury, family law, estate planning, criminal defense",
    Landscaper: "lawn care, landscape design, tree trimming, irrigation, hardscaping",
    "Auto Repair": "oil change, brake repair, engine diagnostics, tire rotation, transmission",
    Electrician: "wiring, panel upgrades, outlets, lighting, EV charger installation",
    Other: "",
};
var INITIAL_FORM = {
    name: "",
    category: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    service_areas: "",
    website: "",
    google_listing: "",
    phone: "",
};
var TOTAL_STEPS = 3;
function AddClientWizard(_a) {
    var open = _a.open, onOpenChange = _a.onOpenChange, onComplete = _a.onComplete;
    var _b = React.useState(1), step = _b[0], setStep = _b[1];
    var _c = React.useState(INITIAL_FORM), form = _c[0], setForm = _c[1];
    var _d = React.useState(false), loading = _d[0], setLoading = _d[1];
    var _e = React.useState(null), error = _e[0], setError = _e[1];
    // Reset wizard state when dialog opens
    React.useEffect(function () {
        if (open) {
            setStep(1);
            setForm(INITIAL_FORM);
            setError(null);
            setLoading(false);
        }
    }, [open]);
    function set(field, value) {
        setForm(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    }
    function canAdvance() {
        if (step === 1)
            return form.name.trim().length > 0;
        if (step === 2)
            return form.city.trim().length > 0 && form.state.trim().length > 0;
        return true;
    }
    function handleNext() {
        if (!canAdvance())
            return;
        setStep(function (s) { return Math.min(s + 1, TOTAL_STEPS); });
    }
    function handleBack() {
        setError(null);
        setStep(function (s) { return Math.max(s - 1, 1); });
    }
    function handleFinish() {
        return __awaiter(this, void 0, void 0, function () {
            var specialties, payload, res, data, businessId, _a;
            var _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (loading)
                            return [2 /*return*/];
                        setLoading(true);
                        setError(null);
                        specialties = (_b = SPECIALTIES_MAP[form.category]) !== null && _b !== void 0 ? _b : "";
                        payload = {
                            name: form.name,
                            category: form.category,
                            primary_city: form.city,
                            primary_state: form.state,
                            address: form.address,
                            zip: form.zip,
                            service_areas: form.service_areas,
                            website: form.website,
                            google_listing: form.google_listing,
                            phone: form.phone,
                            specialties: specialties,
                            description: "",
                            gbp_connected: false,
                            force_new: true,
                        };
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, fetch("/api/businesses", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(payload),
                            })];
                    case 2:
                        res = _f.sent();
                        return [4 /*yield*/, res.json()];
                    case 3:
                        data = _f.sent();
                        if (!res.ok) {
                            setError((_c = data === null || data === void 0 ? void 0 : data.error) !== null && _c !== void 0 ? _c : "Failed to create business. Please try again.");
                            return [2 /*return*/];
                        }
                        businessId = (_e = (_d = data === null || data === void 0 ? void 0 : data.business) === null || _d === void 0 ? void 0 : _d.id) !== null && _e !== void 0 ? _e : data === null || data === void 0 ? void 0 : data.id;
                        if (!businessId) {
                            setError("Unexpected response from server.");
                            return [2 /*return*/];
                        }
                        onComplete(businessId);
                        onOpenChange(false);
                        return [3 /*break*/, 6];
                    case 4:
                        _a = _f.sent();
                        setError("Network error. Please check your connection and try again.");
                        return [3 /*break*/, 6];
                    case 5:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    return (<dialog_1.Dialog open={open} onOpenChange={loading ? undefined : onOpenChange}>
      <dialog_1.DialogContent className="bg-[#111] border border-white/10 text-white max-w-lg p-0 overflow-hidden" showCloseButton={!loading}>
        {/* Progress bar */}
        <div className="h-1 w-full bg-white/10">
          <div className="h-full bg-[#FFD700] transition-all duration-300" style={{ width: "".concat((step / TOTAL_STEPS) * 100, "%") }}/>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <dialog_1.DialogHeader>
            <div className="flex items-center justify-between">
              <dialog_1.DialogTitle className="text-white text-xl font-semibold">
                {step === 1 && "Business Info"}
                {step === 2 && "Location"}
                {step === 3 && "Online Presence"}
              </dialog_1.DialogTitle>
              <span className="text-xs text-white/40 font-mono">
                Step {step}/{TOTAL_STEPS}
              </span>
            </div>
            <p className="text-white/50 text-sm">
              {step === 1 && "Tell us about the client's business."}
              {step === 2 && "Where is the business located?"}
              {step === 3 && "How can customers find this business online?"}
            </p>
          </dialog_1.DialogHeader>

          {/* Step content */}
          <div className="flex flex-col gap-4">
            {step === 1 && (<>
                <div className="flex flex-col gap-1.5">
                  <label_1.Label className="text-white/70 text-sm">
                    Business Name <span className="text-[#FFD700]">*</span>
                  </label_1.Label>
                  <input_1.Input value={form.name} onChange={function (e) { return set("name", e.target.value); }} placeholder="e.g. Apex Plumbing LLC" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20" autoFocus/>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label_1.Label className="text-white/70 text-sm">Category</label_1.Label>
                  <select value={form.category} onChange={function (e) { return set("category", e.target.value); }} className="w-full h-9 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD700]/50 focus:ring-2 focus:ring-[#FFD700]/20">
                    <option value="" className="bg-[#111]">Select a category…</option>
                    {CATEGORIES.map(function (cat) { return (<option key={cat} value={cat} className="bg-[#111]">
                        {cat}
                      </option>); })}
                  </select>
                </div>

                {form.category && form.category !== "Other" && (<div className="rounded-md border border-[#FFD700]/20 bg-[#FFD700]/5 px-3 py-2">
                    <p className="text-xs text-white/50 mb-1">Auto-populated specialties</p>
                    <p className="text-xs text-[#FFD700]/80">{SPECIALTIES_MAP[form.category]}</p>
                  </div>)}
              </>)}

            {step === 2 && (<>
                <div className="flex flex-col gap-1.5">
                  <label_1.Label className="text-white/70 text-sm">Street Address</label_1.Label>
                  <input_1.Input value={form.address} onChange={function (e) { return set("address", e.target.value); }} placeholder="123 Main St" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20" autoFocus/>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label_1.Label className="text-white/70 text-sm">
                      City <span className="text-[#FFD700]">*</span>
                    </label_1.Label>
                    <input_1.Input value={form.city} onChange={function (e) { return set("city", e.target.value); }} placeholder="Minneapolis" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20"/>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label_1.Label className="text-white/70 text-sm">
                      State <span className="text-[#FFD700]">*</span>
                    </label_1.Label>
                    <input_1.Input value={form.state} onChange={function (e) { return set("state", e.target.value); }} placeholder="MN" maxLength={2} className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20"/>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label_1.Label className="text-white/70 text-sm">ZIP Code</label_1.Label>
                  <input_1.Input value={form.zip} onChange={function (e) { return set("zip", e.target.value); }} placeholder="55401" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20"/>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label_1.Label className="text-white/70 text-sm">Service Areas</label_1.Label>
                  <input_1.Input value={form.service_areas} onChange={function (e) { return set("service_areas", e.target.value); }} placeholder="Apple Valley, Burnsville, Lakeville" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20"/>
                  <p className="text-xs text-white/30">Comma-separated cities</p>
                </div>
              </>)}

            {step === 3 && (<>
                <div className="flex flex-col gap-1.5">
                  <label_1.Label className="text-white/70 text-sm">Website URL</label_1.Label>
                  <input_1.Input value={form.website} onChange={function (e) { return set("website", e.target.value); }} placeholder="https://example.com" type="url" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20" autoFocus/>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label_1.Label className="text-white/70 text-sm">Google Business Listing URL</label_1.Label>
                  <input_1.Input value={form.google_listing} onChange={function (e) { return set("google_listing", e.target.value); }} placeholder="https://maps.google.com/..." type="url" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20"/>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label_1.Label className="text-white/70 text-sm">Phone</label_1.Label>
                  <input_1.Input value={form.phone} onChange={function (e) { return set("phone", e.target.value); }} placeholder="(612) 555-0100" type="tel" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700]/50 focus:ring-[#FFD700]/20"/>
                </div>
              </>)}

            {error && (<div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2">
                <p className="text-xs text-red-400">{error}</p>
              </div>)}
          </div>

          {/* Footer navigation */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <button_1.Button variant="ghost" onClick={handleBack} disabled={step === 1 || loading} className="text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30">
              Back
            </button_1.Button>

            <div className="flex gap-1.5">
              {Array.from({ length: TOTAL_STEPS }, function (_, i) { return (<div key={i} className={"w-1.5 h-1.5 rounded-full transition-colors ".concat(i + 1 === step ? "bg-[#FFD700]" : i + 1 < step ? "bg-[#FFD700]/50" : "bg-white/20")}/>); })}
            </div>

            {step < TOTAL_STEPS ? (<button_1.Button onClick={handleNext} disabled={!canAdvance()} className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold disabled:opacity-40">
                Next
              </button_1.Button>) : (<button_1.Button onClick={handleFinish} disabled={loading} className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold disabled:opacity-40 min-w-[80px]">
                {loading ? (<span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Saving…
                  </span>) : ("Add Client")}
              </button_1.Button>)}
          </div>
        </div>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
}
exports.default = AddClientWizard;
