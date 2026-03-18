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
exports.GET = GET;
exports.dynamic = 'force-dynamic';
var server_1 = require("@clerk/nextjs/server");
var supabase_1 = require("@/lib/supabase");
var server_2 = require("next/server");
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, body, _a, supabase, user, userRecord, plan, businessLimit, existingBusinesses, existingCount, _b, business_1, error_1, _c, business_2, error_2, _d, business, error;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, (0, server_1.auth)()];
                case 1:
                    userId = (_e.sent()).userId;
                    if (!userId)
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'Unauthorized' }, { status: 401 })];
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, req.json()];
                case 3:
                    body = _e.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _a = _e.sent();
                    return [2 /*return*/, server_2.NextResponse.json({ error: 'Invalid request body' }, { status: 400 })];
                case 5:
                    supabase = (0, supabase_1.createServerClient)();
                    if (!supabase)
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'Database not configured' }, { status: 503 })
                            // Upsert user record
                        ];
                    // Upsert user record
                    return [4 /*yield*/, supabase.from('users').upsert({ clerk_id: userId, email: body.email || '' }, { onConflict: 'clerk_id' })
                        // Get user id
                    ];
                case 6:
                    // Upsert user record
                    _e.sent();
                    return [4 /*yield*/, supabase.from('users').select('id').eq('clerk_id', userId).single()];
                case 7:
                    user = (_e.sent()).data;
                    if (!user)
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'User not found' }, { status: 404 })
                            // Get user's plan to check business limits
                        ];
                    return [4 /*yield*/, supabase.from('users').select('plan').eq('clerk_id', userId).single()];
                case 8:
                    userRecord = (_e.sent()).data;
                    plan = ((userRecord === null || userRecord === void 0 ? void 0 : userRecord.plan) || 'free').toLowerCase();
                    businessLimit = plan === 'agency' ? null : plan === 'solo' ? 3 : 1;
                    return [4 /*yield*/, supabase
                            .from('businesses')
                            .select('id')
                            .eq('user_id', user.id)];
                case 9:
                    existingBusinesses = (_e.sent()).data;
                    existingCount = (existingBusinesses === null || existingBusinesses === void 0 ? void 0 : existingBusinesses.length) || 0;
                    if (!body.id) return [3 /*break*/, 11];
                    return [4 /*yield*/, supabase
                            .from('businesses')
                            .update({
                            name: body.name || undefined,
                            phone: body.phone || undefined,
                            website: body.website || undefined,
                            primary_city: body.city || body.primary_city || undefined,
                            primary_state: body.state || body.primary_state || undefined,
                            address: body.address || undefined,
                            zip: body.zip || undefined,
                            description: body.description || undefined,
                            service_areas: body.service_areas
                                ? (typeof body.service_areas === 'string'
                                    ? body.service_areas.split(',').map(function (s) { return s.trim(); }).filter(Boolean)
                                    : body.service_areas)
                                : undefined,
                            specialties: body.specialties || undefined,
                        })
                            .eq('id', body.id)
                            .eq('user_id', user.id) // ensure ownership
                            .select()
                            .single()];
                case 10:
                    _b = _e.sent(), business_1 = _b.data, error_1 = _b.error;
                    if (error_1)
                        return [2 /*return*/, server_2.NextResponse.json({ error: error_1.message }, { status: 500 })];
                    return [2 /*return*/, server_2.NextResponse.json({ business: business_1 })];
                case 11:
                    if (!(!body.force_new && existingCount === 1 && !body.category)) return [3 /*break*/, 13];
                    return [4 /*yield*/, supabase
                            .from('businesses')
                            .update({
                            name: body.name || undefined,
                            phone: body.phone || undefined,
                            website: body.website || undefined,
                            primary_city: body.city || body.primary_city || undefined,
                            primary_state: body.state || body.primary_state || undefined,
                            address: body.address || undefined,
                            zip: body.zip || undefined,
                            description: body.description || undefined,
                            service_areas: body.service_areas
                                ? (typeof body.service_areas === 'string'
                                    ? body.service_areas.split(',').map(function (s) { return s.trim(); }).filter(Boolean)
                                    : body.service_areas)
                                : undefined,
                            specialties: body.specialties || undefined,
                        })
                            .eq('user_id', user.id)
                            .select()
                            .single()];
                case 12:
                    _c = _e.sent(), business_2 = _c.data, error_2 = _c.error;
                    if (error_2)
                        return [2 /*return*/, server_2.NextResponse.json({ error: error_2.message }, { status: 500 })];
                    return [2 /*return*/, server_2.NextResponse.json({ business: business_2 })];
                case 13:
                    // CREATE new business — check plan limits
                    if (businessLimit !== null && existingCount >= businessLimit) {
                        return [2 /*return*/, server_2.NextResponse.json({
                                error: 'business_limit_reached',
                                limit: businessLimit,
                                current: existingCount,
                                plan: plan,
                                upgrade_url: '/pricing',
                            }, { status: 403 })];
                    }
                    return [4 /*yield*/, supabase
                            .from('businesses')
                            .insert({
                            user_id: user.id,
                            name: body.name || 'My Business',
                            category: body.category || '',
                            primary_city: body.city || body.primary_city || '',
                            primary_state: body.state || body.primary_state || '',
                            service_areas: body.service_areas
                                ? (typeof body.service_areas === 'string'
                                    ? body.service_areas.split(',').map(function (s) { return s.trim(); }).filter(Boolean)
                                    : body.service_areas)
                                : [],
                            phone: body.phone || '',
                            website: body.website || '',
                            google_listing: body.google_listing || '',
                            address: body.address || '',
                            zip: body.zip || '',
                            description: body.description || '',
                            specialties: body.specialties || '',
                            gbp_connected: false,
                        })
                            .select()
                            .single()];
                case 14:
                    _d = _e.sent(), business = _d.data, error = _d.error;
                    if (error)
                        return [2 /*return*/, server_2.NextResponse.json({ error: error.message }, { status: 500 })];
                    return [2 /*return*/, server_2.NextResponse.json({ business: business, id: business.id })];
            }
        });
    });
}
function GET() {
    return __awaiter(this, void 0, void 0, function () {
        var userId, supabase, user, businesses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, server_1.auth)()];
                case 1:
                    userId = (_a.sent()).userId;
                    if (!userId)
                        return [2 /*return*/, server_2.NextResponse.json({ error: 'Unauthorized' }, { status: 401 })];
                    supabase = (0, supabase_1.createServerClient)();
                    if (!supabase)
                        return [2 /*return*/, server_2.NextResponse.json({ business: null, businesses: [] })];
                    return [4 /*yield*/, supabase.from('users').select('id').eq('clerk_id', userId).single()];
                case 2:
                    user = (_a.sent()).data;
                    if (!user)
                        return [2 /*return*/, server_2.NextResponse.json({ business: null, businesses: [] })];
                    return [4 /*yield*/, supabase
                            .from('businesses')
                            .select('*')
                            .eq('user_id', user.id)
                            .order('created_at', { ascending: false })];
                case 3:
                    businesses = (_a.sent()).data;
                    return [2 /*return*/, server_2.NextResponse.json({
                            business: (businesses === null || businesses === void 0 ? void 0 : businesses[0]) || null,
                            businesses: businesses || [],
                        })];
            }
        });
    });
}
