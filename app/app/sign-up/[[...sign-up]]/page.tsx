'use client'
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const appearance = {
  elements: {
    rootBox: "w-full max-w-md",
    card: "bg-white border border-gray-200 shadow-xl",
    headerTitle: "text-[#1B2A4A]",
    headerSubtitle: "text-[#1B2A4A]/60",
    formFieldLabel: "text-[#1B2A4A]/70",
    formFieldInput:
      "bg-gray-50 border-gray-200 text-[#1B2A4A] placeholder:text-gray-400 focus:border-[#FF6B35]/50",
    formButtonPrimary:
      "bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 font-semibold",
    footerActionLink: "text-[#FF6B35] hover:text-[#FF6B35]/80",
    identityPreviewText: "text-[#1B2A4A]",
    identityPreviewEditButton: "text-[#FF6B35]",
    dividerLine: "bg-gray-200",
    dividerText: "text-gray-400",
    socialButtonsBlockButton:
      "bg-gray-50 border-gray-200 text-[#1B2A4A] hover:bg-gray-100",
    socialButtonsBlockButtonText: "text-[#1B2A4A]",
  },
}

function SignUpContent() {
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan')
  const redirectUrl =
    plan === 'solo' || plan === 'dfy'
      ? `/onboarding?plan=${plan}`
      : '/onboarding'

  return <SignUp forceRedirectUrl={redirectUrl} appearance={appearance} />
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF7] flex flex-col items-center justify-center px-4">
      <div className="mb-8 text-center">
        <Link href="/" className="flex items-center gap-2 justify-center mb-4">
          <Image
            src="/logo-48.png"
            alt="LocalBeacon"
            width={32}
            height={32}
          />
          <span className="text-2xl font-bold text-[#1B2A4A]">
            LocalBeacon.ai
          </span>
        </Link>
        <p className="text-[#1B2A4A]/50 text-sm">
          Start for free — no credit card required.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="w-full max-w-md h-96 bg-white border border-gray-200 shadow-xl rounded-lg" />
        }
      >
        <SignUpContent />
      </Suspense>
    </div>
  );
}
