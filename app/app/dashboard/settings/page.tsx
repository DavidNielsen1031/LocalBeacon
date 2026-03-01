import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <div className="flex-1 px-6 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-white/50 mt-1 text-sm">
          Manage your account and subscription preferences.
        </p>
      </div>

      {/* Account */}
      <Card className="bg-white/5 border-white/10 mb-6">
        <CardHeader>
          <CardTitle className="text-white text-base">Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-white/70 text-sm mb-1.5 block">
              Business Name
            </Label>
            <Input
              placeholder="Your Business Name"
              className="bg-white/5 border-white/20 text-white placeholder:text-white/30"
            />
          </div>
          <div>
            <Label className="text-white/70 text-sm mb-1.5 block">
              Email Address
            </Label>
            <Input
              placeholder="you@example.com"
              type="email"
              className="bg-white/5 border-white/20 text-white placeholder:text-white/30"
            />
          </div>
          <Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold text-sm">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            Subscription
            <Badge className="bg-white/10 text-white/60 border-white/20 text-xs">
              Free Plan
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/50 text-sm mb-4">
            You are on the Free plan. Upgrade to unlock unlimited posts, pages,
            and AI review replies.
          </p>
          <Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold text-sm">
            Upgrade to Solo — $29/month
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
