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
var server_1 = require("next/server");
var supabase_1 = require("@/lib/supabase");
var email_1 = require("@/lib/email");
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, url_scanned, score, checks, emailRegex, supabase, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, req.json()];
                case 1:
                    _a = _b.sent(), email = _a.email, url_scanned = _a.url_scanned, score = _a.score, checks = _a.checks;
                    if (!email || !url_scanned) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: 'Email and URL are required' }, { status: 400 })];
                    }
                    emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: 'Invalid email address' }, { status: 400 })];
                    }
                    supabase = (0, supabase_1.createServerClient)();
                    if (!!supabase) return [3 /*break*/, 2];
                    // If no DB, just acknowledge — don't block the user
                    console.log(JSON.stringify({
                        event: 'lead_captured_no_db',
                        email: email,
                        url_scanned: url_scanned,
                        score: score,
                        timestamp: new Date().toISOString(),
                    }));
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, supabase.from('leads').insert({
                        email: email,
                        url_scanned: url_scanned,
                        score: score !== null && score !== void 0 ? score : null,
                    })];
                case 3:
                    error = (_b.sent()).error;
                    if (error) {
                        console.error(JSON.stringify({
                            event: 'lead_save_failed',
                            email: email,
                            url_scanned: url_scanned,
                            error: error.message,
                            timestamp: new Date().toISOString(),
                        }));
                    }
                    else {
                        console.log(JSON.stringify({
                            event: 'lead_captured',
                            email: email,
                            url_scanned: url_scanned,
                            score: score,
                            timestamp: new Date().toISOString(),
                        }));
                    }
                    _b.label = 4;
                case 4:
                    // Send the AEO report email (best-effort, don't block response)
                    if (checks && Array.isArray(checks) && score != null) {
                        (0, email_1.sendAeoReportEmail)({
                            to: email,
                            url: url_scanned,
                            score: score,
                            checks: checks,
                        }).then(function (result) {
                            console.log(JSON.stringify({
                                event: result.success ? 'aeo_report_email_sent' : 'aeo_report_email_failed',
                                email: email,
                                url_scanned: url_scanned,
                                emailId: result.success ? result.id : undefined,
                                error: result.success ? undefined : result.error,
                                timestamp: new Date().toISOString(),
                            }));
                        }).catch(function (err) {
                            console.error('[leads] AEO report email error:', err);
                        });
                    }
                    return [2 /*return*/, server_1.NextResponse.json({ ok: true })];
            }
        });
    });
}
