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
exports.sendWeeklyContentEmail = sendWeeklyContentEmail;
exports.sendAeoReportEmail = sendAeoReportEmail;
exports.sendMonthlyReportEmail = sendMonthlyReportEmail;
var resend_1 = require("resend");
var resend = process.env.RESEND_API_KEY
    ? new resend_1.Resend(process.env.RESEND_API_KEY)
    : null;
var FROM_EMAIL = 'LocalBeacon <hello@localbeacon.ai>';
function sendWeeklyContentEmail(data) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!resend) {
                        console.log('[email] Resend not configured, skipping weekly email');
                        return [2 /*return*/, { success: false, error: 'Resend not configured' }];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, resend.emails.send({
                            from: FROM_EMAIL,
                            to: data.to,
                            subject: "Your weekly Google post is ready \u2014 ".concat(data.businessName),
                            html: "\n<!DOCTYPE html>\n<html>\n<head><meta charset=\"utf-8\"></head>\n<body style=\"font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #2D3436;\">\n  <div style=\"text-align: center; margin-bottom: 32px;\">\n    <h2 style=\"color: #1B2A4A; margin: 0;\">\uD83D\uDD26 LocalBeacon</h2>\n    <p style=\"color: #636E72; font-size: 14px; margin-top: 4px;\">Weekly content for ".concat(data.businessName, "</p>\n  </div>\n\n  <div style=\"background: #FFF8F0; border: 1px solid #FFE0CC; border-radius: 12px; padding: 24px; margin-bottom: 24px;\">\n    <h3 style=\"color: #1B2A4A; margin: 0 0 8px 0; font-size: 16px;\">").concat(data.postTitle, "</h3>\n    <p style=\"color: #2D3436; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;\">").concat(data.postContent, "</p>\n  </div>\n\n  <div style=\"text-align: center; margin-bottom: 32px;\">\n    <p style=\"color: #636E72; font-size: 14px; margin-bottom: 16px;\">Copy this post and paste it into your Google Business Profile.</p>\n    <a href=\"").concat(data.dashboardUrl, "/dashboard/queue\" \n       style=\"display: inline-block; background: #FF6B35; color: white; font-weight: 700; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 15px;\">\n      View in Dashboard \u2192\n    </a>\n  </div>\n\n  <div style=\"background: #FFF8F0; border-radius: 8px; padding: 16px; margin-bottom: 24px;\">\n    <p style=\"color: #636E72; font-size: 13px; margin: 0 0 8px 0; font-weight: 600;\">\uD83D\uDCCB How to post this (30 seconds):</p>\n    <ol style=\"color: #636E72; font-size: 13px; margin: 0; padding-left: 20px; line-height: 1.8;\">\n      <li>Copy the post text above</li>\n      <li>Go to <a href=\"https://business.google.com\" style=\"color: #FF6B35;\">business.google.com</a></li>\n      <li>Click \"Add update\" and paste</li>\n      <li>Hit Publish \u2014 done!</li>\n    </ol>\n  </div>\n\n  <hr style=\"border: none; border-top: 1px solid #DFE6E9; margin: 24px 0;\">\n  <p style=\"color: #636E72; font-size: 12px; text-align: center;\">\n    You're receiving this because you're signed up at <a href=\"https://localbeacon.ai\" style=\"color: #FF6B35;\">LocalBeacon.ai</a>.<br>\n    <a href=\"https://localbeacon.ai/dashboard/settings\" style=\"color: #B2BEC3; font-size: 11px;\">Unsubscribe from weekly emails</a>\n  </p>\n</body>\n</html>"),
                        })];
                case 2:
                    result = _b.sent();
                    return [2 /*return*/, { success: true, id: (_a = result.data) === null || _a === void 0 ? void 0 : _a.id }];
                case 3:
                    error_1 = _b.sent();
                    console.error('[email] Failed to send weekly email:', error_1);
                    return [2 /*return*/, { success: false, error: String(error_1) }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getGradeInfo(score) {
    if (score >= 90)
        return { grade: 'A', color: '#22c55e', label: 'Excellent — your business is AI-ready' };
    if (score >= 75)
        return { grade: 'B', color: '#84cc16', label: 'Good — a few gaps to close' };
    if (score >= 60)
        return { grade: 'C', color: '#eab308', label: 'Needs improvement — significant opportunities' };
    if (score >= 40)
        return { grade: 'D', color: '#f97316', label: 'Significant gaps — action needed' };
    return { grade: 'F', color: '#ef4444', label: 'Not AI-ready — but we can fix that' };
}
function sendAeoReportEmail(data) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, grade, color, label, failing, passing, domain, failingHtml, passingHtml, result, error_2;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!resend) {
                        console.log('[email] Resend not configured, skipping AEO report email');
                        return [2 /*return*/, { success: false, error: 'Resend not configured' }];
                    }
                    _a = getGradeInfo(data.score), grade = _a.grade, color = _a.color, label = _a.label;
                    failing = data.checks.filter(function (c) { return !c.passed; }).sort(function (a, b) { return b.weight - a.weight; });
                    passing = data.checks.filter(function (c) { return c.passed; });
                    domain = data.url.replace(/^https?:\/\//, '').split('/')[0];
                    failingHtml = failing.length > 0
                        ? failing.map(function (c) { return "\n      <div style=\"background: #FFF5F3; border: 1px solid #F5C6BC; border-radius: 10px; padding: 16px; margin-bottom: 10px;\">\n        <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 6px;\">\n          <span style=\"color: #ef4444; font-size: 16px;\">\u2717</span>\n          <strong style=\"color: #1B2A4A; font-size: 14px;\">".concat(c.label, "</strong>\n          <span style=\"background: #FEE2E2; color: #991B1B; font-size: 11px; padding: 2px 8px; border-radius: 9999px; font-weight: 600;\">Weight: ").concat(c.weight, "</span>\n        </div>\n        <p style=\"color: #636E72; font-size: 13px; margin: 0 0 8px; line-height: 1.5;\">").concat(c.details, "</p>\n        <p style=\"color: #FF6B35; font-size: 13px; margin: 0; font-weight: 600;\">Fix: ").concat(c.fix, "</p>\n      </div>\n    "); }).join('')
                        : '<p style="color: #22c55e; font-weight: 600;">All checks passed!</p>';
                    passingHtml = passing.map(function (c) { return "\n    <div style=\"display: flex; align-items: center; gap: 8px; padding: 8px 0; border-bottom: 1px solid #F0F0F0;\">\n      <span style=\"color: #22c55e; font-size: 14px;\">\u2713</span>\n      <span style=\"color: #1B2A4A; font-size: 13px;\">".concat(c.label, "</span>\n    </div>\n  "); }).join('');
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, resend.emails.send({
                            from: FROM_EMAIL,
                            to: data.to,
                            subject: "Your AI Readiness Report: ".concat(data.score, "/100 (Grade ").concat(grade, ") \u2014 ").concat(domain),
                            html: "\n<!DOCTYPE html>\n<html>\n<head><meta charset=\"utf-8\"></head>\n<body style=\"font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #2D3436; background: #FAFAF7;\">\n  <div style=\"text-align: center; margin-bottom: 32px;\">\n    <h2 style=\"color: #1B2A4A; margin: 0 0 4px;\">\uD83D\uDD26 LocalBeacon</h2>\n    <p style=\"color: #636E72; font-size: 14px; margin: 0;\">AI Readiness Report</p>\n  </div>\n\n  <div style=\"text-align: center; margin-bottom: 32px;\">\n    <p style=\"color: #636E72; font-size: 14px; margin: 0 0 16px;\">Results for <strong style=\"color: #1B2A4A;\">".concat(domain, "</strong></p>\n    <div style=\"display: inline-block; background: white; border-radius: 16px; padding: 32px 48px; border: 2px solid ").concat(color, ";\">\n      <div style=\"font-size: 48px; font-weight: 800; color: ").concat(color, "; line-height: 1;\">").concat(data.score, "</div>\n      <div style=\"font-size: 13px; color: #636E72; margin-top: 4px;\">out of 100</div>\n      <div style=\"margin-top: 8px; display: inline-block; background: ").concat(color, "20; color: ").concat(color, "; font-weight: 700; padding: 4px 16px; border-radius: 9999px; font-size: 14px;\">\n        Grade ").concat(grade, "\n      </div>\n    </div>\n    <p style=\"color: #636E72; font-size: 14px; margin-top: 12px;\">").concat(label, "</p>\n  </div>\n\n  ").concat(failing.length > 0 ? "\n  <div style=\"margin-bottom: 32px;\">\n    <h3 style=\"color: #1B2A4A; font-size: 16px; margin: 0 0 16px;\">\uD83D\uDD34 Needs attention (".concat(failing.length, " issue").concat(failing.length !== 1 ? 's' : '', ")</h3>\n    ").concat(failingHtml, "\n  </div>\n  ") : '', "\n\n  ").concat(passing.length > 0 ? "\n  <div style=\"margin-bottom: 32px;\">\n    <h3 style=\"color: #1B2A4A; font-size: 16px; margin: 0 0 12px;\">\uD83D\uDFE2 Passing (".concat(passing.length, " signal").concat(passing.length !== 1 ? 's' : '', ")</h3>\n    <div style=\"background: white; border-radius: 12px; padding: 8px 16px; border: 1px solid #DFE6E9;\">\n      ").concat(passingHtml, "\n    </div>\n  </div>\n  ") : '', "\n\n  <div style=\"text-align: center; background: #1B2A4A; border-radius: 12px; padding: 32px; margin-bottom: 24px;\">\n    <h3 style=\"color: white; margin: 0 0 8px; font-size: 16px;\">Want LocalBeacon to fix these for you?</h3>\n    <p style=\"color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 16px;\">We automate local SEO, AI optimization, and content \u2014 starting free.</p>\n    <a href=\"https://localbeacon.ai/sign-up\"\n       style=\"display: inline-block; background: #FF6B35; color: white; font-weight: 700; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 15px;\">\n      Get Started Free \u2192\n    </a>\n  </div>\n\n  <hr style=\"border: none; border-top: 1px solid #DFE6E9; margin: 24px 0;\">\n  <p style=\"color: #636E72; font-size: 12px; text-align: center;\">\n    You requested this report at <a href=\"https://localbeacon.ai/check\" style=\"color: #FF6B35;\">localbeacon.ai/check</a>.<br>\n    Questions? Reply to this email or contact <a href=\"mailto:hello@localbeacon.ai\" style=\"color: #FF6B35;\">hello@localbeacon.ai</a>\n  </p>\n</body>\n</html>"),
                        })];
                case 2:
                    result = _c.sent();
                    return [2 /*return*/, { success: true, id: (_b = result.data) === null || _b === void 0 ? void 0 : _b.id }];
                case 3:
                    error_2 = _c.sent();
                    console.error('[email] Failed to send AEO report email:', error_2);
                    return [2 /*return*/, { success: false, error: String(error_2) }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function sendMonthlyReportEmail(data) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_3;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!resend) {
                        console.log('[email] Resend not configured, skipping monthly email');
                        return [2 /*return*/, { success: false, error: 'Resend not configured' }];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, resend.emails.send({
                            from: FROM_EMAIL,
                            to: data.to,
                            subject: "".concat(data.month, " Content Summary \u2014 ").concat(data.businessName),
                            html: "\n<!DOCTYPE html>\n<html>\n<head><meta charset=\"utf-8\"></head>\n<body style=\"font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #2D3436;\">\n  <div style=\"text-align: center; margin-bottom: 32px;\">\n    <h2 style=\"color: #1B2A4A; margin: 0;\">\uD83D\uDD26 LocalBeacon</h2>\n    <p style=\"color: #636E72; font-size: 14px; margin-top: 4px;\">".concat(data.month, " Report for ").concat(data.businessName, "</p>\n  </div>\n\n  <h3 style=\"color: #1B2A4A; margin-bottom: 16px;\">Here's what we created for you this month:</h3>\n\n  <div style=\"display: flex; gap: 12px; margin-bottom: 24px;\">\n    <div style=\"flex: 1; background: #FFF8F0; border-radius: 12px; padding: 20px; text-align: center;\">\n      <div style=\"font-size: 28px; font-weight: 800; color: #1B2A4A;\">").concat(data.postsGenerated, "</div>\n      <div style=\"font-size: 13px; color: #636E72;\">Google Posts</div>\n    </div>\n    <div style=\"flex: 1; background: #FFF8F0; border-radius: 12px; padding: 20px; text-align: center;\">\n      <div style=\"font-size: 28px; font-weight: 800; color: #1B2A4A;\">").concat(data.pagesCreated, "</div>\n      <div style=\"font-size: 13px; color: #636E72;\">City Pages</div>\n    </div>\n    <div style=\"flex: 1; background: #FFF8F0; border-radius: 12px; padding: 20px; text-align: center;\">\n      <div style=\"font-size: 28px; font-weight: 800; color: #1B2A4A;\">").concat(data.reviewsReplied, "</div>\n      <div style=\"font-size: 13px; color: #636E72;\">Review Replies</div>\n    </div>\n  </div>\n\n  ").concat(data.aeoScore !== null ? "\n  <div style=\"background: #F0FDF8; border: 1px solid #A7E8D1; border-radius: 12px; padding: 20px; margin-bottom: 24px; text-align: center;\">\n    <div style=\"font-size: 13px; color: #636E72; margin-bottom: 4px;\">AI Readiness Score</div>\n    <div style=\"font-size: 36px; font-weight: 800; color: #00795C;\">".concat(data.aeoScore, "/100</div>\n  </div>\n  ") : '', "\n\n  <div style=\"text-align: center; margin-bottom: 32px;\">\n    <a href=\"").concat(data.dashboardUrl, "/dashboard/reports\" \n       style=\"display: inline-block; background: #FF6B35; color: white; font-weight: 700; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 15px;\">\n      View Full Report \u2192\n    </a>\n  </div>\n\n  <hr style=\"border: none; border-top: 1px solid #DFE6E9; margin: 24px 0;\">\n  <p style=\"color: #636E72; font-size: 12px; text-align: center;\">\n    You're receiving this because you're signed up at <a href=\"https://localbeacon.ai\" style=\"color: #FF6B35;\">LocalBeacon.ai</a>.<br>\n    <a href=\"https://localbeacon.ai/dashboard/settings\" style=\"color: #B2BEC3; font-size: 11px;\">Unsubscribe from monthly reports</a>\n  </p>\n</body>\n</html>"),
                        })];
                case 2:
                    result = _b.sent();
                    return [2 /*return*/, { success: true, id: (_a = result.data) === null || _a === void 0 ? void 0 : _a.id }];
                case 3:
                    error_3 = _b.sent();
                    console.error('[email] Failed to send monthly email:', error_3);
                    return [2 /*return*/, { success: false, error: String(error_3) }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
