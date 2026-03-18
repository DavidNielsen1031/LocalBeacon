"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
exports.createServerClient = createServerClient;
var supabase_js_1 = require("@supabase/supabase-js");
var supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
var supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
exports.supabase = supabaseUrl && supabaseAnonKey
    ? (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey)
    : null;
// Server-side client with service role key (bypasses RLS — for API routes only)
function createServerClient() {
    var url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    var serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey)
        return exports.supabase;
    return (0, supabase_js_1.createClient)(url, serviceKey);
}
