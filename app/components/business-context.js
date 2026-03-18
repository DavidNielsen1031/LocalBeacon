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
exports.useBusinessContext = useBusinessContext;
exports.BusinessProvider = BusinessProvider;
var react_1 = require("react");
var BusinessContext = (0, react_1.createContext)({
    businesses: [],
    activeBusiness: null,
    activeBusinessId: null,
    switchBusiness: function () { },
    refreshBusinesses: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); }); },
    canAddBusiness: true,
    businessLimit: null,
    plan: "free",
    loading: true,
});
function useBusinessContext() {
    return (0, react_1.useContext)(BusinessContext);
}
function BusinessProvider(_a) {
    var _this = this;
    var children = _a.children, initialBusinesses = _a.initialBusinesses, initialActiveId = _a.initialActiveId, plan = _a.plan;
    var _b = (0, react_1.useState)(initialBusinesses), businesses = _b[0], setBusinesses = _b[1];
    var _c = (0, react_1.useState)(initialActiveId || (initialBusinesses.length > 0 ? initialBusinesses[0].id : null)), activeBusinessId = _c[0], setActiveBusinessId = _c[1];
    var _d = (0, react_1.useState)(false), loading = _d[0], setLoading = _d[1];
    var businessLimit = plan === "free" ? 1 : plan === "solo" ? 3 : null;
    var canAddBusiness = businessLimit === null || businesses.length < businessLimit;
    var activeBusiness = businesses.find(function (b) { return b.id === activeBusinessId; }) || null;
    var switchBusiness = (0, react_1.useCallback)(function (id) {
        setActiveBusinessId(id);
        // Persist selection in localStorage
        if (typeof window !== "undefined") {
            localStorage.setItem("lb_active_business", id);
        }
    }, []);
    var refreshBusinesses = (0, react_1.useCallback)(function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setLoading(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 5, 6]);
                    return [4 /*yield*/, fetch("/api/businesses")];
                case 2:
                    res = _b.sent();
                    if (!res.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _b.sent();
                    setBusinesses(data.businesses || []);
                    // If active business was deleted, switch to first
                    if (data.businesses && !data.businesses.find(function (b) { return b.id === activeBusinessId; })) {
                        setActiveBusinessId(((_a = data.businesses[0]) === null || _a === void 0 ? void 0 : _a.id) || null);
                    }
                    _b.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); }, [activeBusinessId]);
    // On mount, restore active business from localStorage
    (0, react_1.useEffect)(function () {
        if (typeof window !== "undefined") {
            var saved_1 = localStorage.getItem("lb_active_business");
            if (saved_1 && businesses.find(function (b) { return b.id === saved_1; })) {
                setActiveBusinessId(saved_1);
            }
        }
    }, [businesses]);
    return (<BusinessContext.Provider value={{
            businesses: businesses,
            activeBusiness: activeBusiness,
            activeBusinessId: activeBusinessId,
            switchBusiness: switchBusiness,
            refreshBusinesses: refreshBusinesses,
            canAddBusiness: canAddBusiness,
            businessLimit: businessLimit,
            plan: plan,
            loading: loading,
        }}>
      {children}
    </BusinessContext.Provider>);
}
