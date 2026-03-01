import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PageBuilderPage() {
  return (
    <div className="flex-1 px-6 py-8 max-w-5xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Page Builder</h1>
          <p className="text-white/50 mt-1 text-sm">
            Build hyper-local landing pages optimized for local search.
          </p>
        </div>
        <Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 font-semibold">
          + New Page
        </Button>
      </div>

      <Card className="bg-white/5 border-white/10 border-dashed">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <span>🌐</span> Local Page Builder
            <Badge className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30 text-xs ml-2">
              Coming in Sprint 2
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/50 text-sm leading-relaxed">
            Create SEO-optimized landing pages for every neighborhood, city, or
            service area you serve. Each page is built for local search intent
            and can be published to your custom domain.
          </p>
          <Button
            variant="outline"
            className="mt-4 border-white/20 text-white hover:bg-white/10 text-sm"
          >
            Create Your First Page
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
