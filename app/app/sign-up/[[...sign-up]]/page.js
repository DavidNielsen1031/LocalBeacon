"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignUpPage;
var nextjs_1 = require("@clerk/nextjs");
var link_1 = require("next/link");
function SignUpPage() {
    return (<div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="mb-8 text-center">
        <link_1.default href="/" className="flex items-center gap-2 justify-center mb-4">
          <span className="text-3xl">🔦</span>
          <span className="text-2xl font-bold text-[#FFD700]">
            LocalBeacon.ai
          </span>
        </link_1.default>
        <p className="text-white/50 text-sm">
          Start for free — no credit card required.
        </p>
      </div>
      <nextjs_1.SignUp appearance={{
            elements: {
                rootBox: "w-full max-w-md",
                card: "bg-[#111] border border-white/10 shadow-xl",
                headerTitle: "text-white",
                headerSubtitle: "text-white/60",
                formFieldLabel: "text-white/70",
                formFieldInput: "bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-[#FFD700]/50",
                formButtonPrimary: "bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold",
                footerActionLink: "text-[#FFD700] hover:text-[#FFD700]/80",
                identityPreviewText: "text-white",
                identityPreviewEditButton: "text-[#FFD700]",
                dividerLine: "bg-white/10",
                dividerText: "text-white/40",
                socialButtonsBlockButton: "bg-white/5 border-white/20 text-white hover:bg-white/10",
                socialButtonsBlockButtonText: "text-white",
            },
        }}/>
    </div>);
}
