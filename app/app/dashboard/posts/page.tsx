import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GBPPostsPage() {
  return (
    <div className="flex-1 px-6 py-8 max-w-5xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">GBP Posts</h1>
          <p className="text-white/50 mt-1 text-sm">
            AI-generate and schedule Google Business Profile posts.
          </p>
        </div>
        <Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold">
          + New Post
        </Button>
      </div>

      <Card className="bg-white/5 border-white/10 border-dashed">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <span>📍</span> GBP Post Automation
            <Badge className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30 text-xs ml-2">
              Coming in Sprint 2
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/50 text-sm leading-relaxed">
            Connect your Google Business Profile to start creating AI-powered
            posts. You&apos;ll be able to generate, schedule, and track
            performance of posts across all your locations.
          </p>
          <Button
            variant="outline"
            className="mt-4 border-white/20 text-white hover:bg-white/10 text-sm"
          >
            Connect Google Business Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
