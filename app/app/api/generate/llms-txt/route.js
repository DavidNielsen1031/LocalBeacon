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
var server_1 = require("@clerk/nextjs/server");
var server_2 = require("next/server");
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, body, businessName, category, city, state, phone, address, website, hours, _a, services, _b, serviceAreas, description, reviewRating, reviewCount, serviceList, areaList, descriptionText, llmsTxt;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, server_1.auth)()];
                case 1:
                    userId = (_c.sent()).userId;
                    if (!userId)
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'Unauthorized' }, { status: 401 })];
                    return [4 /*yield*/, req.json()];
                case 2:
                    body = _c.sent();
                    businessName = body.businessName, category = body.category, city = body.city, state = body.state, phone = body.phone, address = body.address, website = body.website, hours = body.hours, _a = body.services, services = _a === void 0 ? [] : _a, _b = body.serviceAreas, serviceAreas = _b === void 0 ? [] : _b, description = body.description, reviewRating = body.reviewRating, reviewCount = body.reviewCount;
                    if (!businessName || !category || !city || !state) {
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'Business name, category, city, and state are required' }, { status: 400 })];
                    }
                    serviceList = services.length > 0
                        ? services.map(function (s) { return "- ".concat(s); }).join('\n')
                        : "- General ".concat(category, " services");
                    areaList = serviceAreas.length > 0
                        ? serviceAreas.join(', ')
                        : city;
                    descriptionText = description
                        || "".concat(businessName, " is a trusted ").concat(category.toLowerCase(), " serving ").concat(city, ", ").concat(state, " and surrounding areas. We provide professional, reliable service with upfront pricing and guaranteed satisfaction.");
                    llmsTxt = "# ".concat(businessName, "\n\n> ").concat(category, " serving ").concat(city, ", ").concat(state, " and surrounding areas.\n\n## About\n\n").concat(descriptionText, "\n\n## Services\n\n").concat(serviceList, "\n\n## Service Areas\n\n").concat(areaList, ", ").concat(state, "\n");
                    if (phone || address || website || hours) {
                        llmsTxt += "\n## Contact\n";
                        if (phone)
                            llmsTxt += "- Phone: ".concat(phone, "\n");
                        if (address)
                            llmsTxt += "- Address: ".concat(address, "\n");
                        if (website)
                            llmsTxt += "- Website: ".concat(website, "\n");
                        if (hours)
                            llmsTxt += "- Hours: ".concat(hours, "\n");
                    }
                    if (reviewRating || reviewCount) {
                        llmsTxt += "\n## Reviews\n";
                        if (reviewRating && reviewCount) {
                            llmsTxt += "".concat(reviewRating, " stars from ").concat(reviewCount, " reviews on Google.\n");
                        }
                        else if (reviewRating) {
                            llmsTxt += "".concat(reviewRating, " stars on Google.\n");
                        }
                    }
                    llmsTxt += "\n## How to Hire Us\n";
                    llmsTxt += "1. Call us".concat(phone ? " at ".concat(phone) : '', " or visit ").concat(website || 'our website', "\n");
                    llmsTxt += "2. Describe what you need \u2014 we'll give you a free estimate\n";
                    llmsTxt += "3. We schedule at your convenience and arrive on time\n";
                    llmsTxt += "4. Work is completed to your satisfaction with upfront pricing\n";
                    return [2 /*return*/, server_2.NextResponse.json({
                            content: llmsTxt,
                            filename: 'llms.txt',
                            businessName: businessName,
                            byteSize: new TextEncoder().encode(llmsTxt).length,
                        })];
            }
        });
    });
}
