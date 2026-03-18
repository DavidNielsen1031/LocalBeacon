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
exports.POST = POST;
exports.dynamic = 'force-dynamic';
var supabase_1 = require("@/lib/supabase");
var email_1 = require("@/lib/email");
var server_1 = require("next/server");
/**
 * Send weekly content emails to all users with queued content.
 * Called by OpenClaw cron every Monday 9 AM CST.
 * Also callable manually for testing.
 */
function POST() {
    return __awaiter(this, void 0, void 0, function () {
        var supabase, queueItems, byBusiness, _i, queueItems_1, item, sent, errors, _a, byBusiness_1, _b, item, business, user, email, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    supabase = (0, supabase_1.createServerClient)();
                    if (!supabase) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: 'Database not configured' }, { status: 503 })];
                    }
                    return [4 /*yield*/, supabase
                            .from('content_queue')
                            .select("\n      id, title, content, business_id,\n      businesses!inner(id, name, user_id, users!inner(clerk_id, email))\n    ")
                            .eq('status', 'ready')
                            .order('created_at', { ascending: false })];
                case 1:
                    queueItems = (_c.sent()).data;
                    if (!queueItems || queueItems.length === 0) {
                        return [2 /*return*/, server_1.NextResponse.json({ sent: 0, message: 'No ready content to send' })];
                    }
                    byBusiness = new Map();
                    for (_i = 0, queueItems_1 = queueItems; _i < queueItems_1.length; _i++) {
                        item = queueItems_1[_i];
                        if (!byBusiness.has(item.business_id)) {
                            byBusiness.set(item.business_id, item);
                        }
                    }
                    sent = 0;
                    errors = [];
                    _a = 0, byBusiness_1 = byBusiness;
                    _c.label = 2;
                case 2:
                    if (!(_a < byBusiness_1.length)) return [3 /*break*/, 5];
                    _b = byBusiness_1[_a], item = _b[1];
                    business = item.businesses;
                    user = business === null || business === void 0 ? void 0 : business.users;
                    email = user === null || user === void 0 ? void 0 : user.email;
                    if (!email)
                        return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, email_1.sendWeeklyContentEmail)({
                            to: email,
                            businessName: business.name || 'Your Business',
                            postTitle: item.title || 'Your Weekly Google Post',
                            postContent: item.content,
                            dashboardUrl: 'https://localbeacon.ai',
                        })];
                case 3:
                    result = _c.sent();
                    if (result.success) {
                        sent++;
                    }
                    else {
                        errors.push("".concat(email, ": ").concat(result.error));
                    }
                    _c.label = 4;
                case 4:
                    _a++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, server_1.NextResponse.json({ sent: sent, total: byBusiness.size, errors: errors })];
            }
        });
    });
}
