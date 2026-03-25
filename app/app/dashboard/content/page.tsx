"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBusinessContext } from "@/components/business-context";
import Link from "next/link";
import {
  FileText,
  Globe,
  Star,
  BookOpen,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";

const ORANGE = "#FF6B35";
const NAVY = "#1B2A4A";
const SLATE = "#636E72";
const MIST = "#DFE6E9";

type ContentTab = "posts" | "pages" | "reviews" | "blog";

interface ContentItem {
  id: string;
  type: string;
  title: string;
  content?: string;
  status?: string;
  created_at: string;
  url?: string;
  slug?: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleCopy}
      className="text-xs gap-1"
      style={{ borderColor: ORANGE, color: copied ? "#16a34a" : ORANGE }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
}

const TABS: { key: ContentTab; label: string; Icon: typeof FileText }[] = [
  { key: "posts", label: "Google Posts", Icon: FileText },
  { key: "pages", label: "City Pages", Icon: Globe },
  { key: "reviews", label: "Review Replies", Icon: Star },
  { key: "blog", label: "Blog Posts", Icon: BookOpen },
];

export default function ContentPage() {
  const { activeBusinessId } = useBusinessContext();
  const [tab, setTab] = useState<ContentTab>("posts");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeBusinessId) {
      setItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    // Use the dashboard API to get all content
    fetch(`/api/businesses/${activeBusinessId}/dashboard`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.recentItems) {
          setItems(data.recentItems);
        }
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [activeBusinessId]);

  const filteredItems = items.filter((item) => {
    if (tab === "posts") return item.type === "gbp_post";
    if (tab === "pages") return item.type === "city_page";
    if (tab === "reviews") return item.type === "review_reply";
    if (tab === "blog") return item.type === "blog_post";
    return false;
  });

  return (
    <div className="flex-1 px-6 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: NAVY }}>
          Content
        </h1>
        <p className="text-sm mt-1" style={{ color: SLATE }}>
          Everything Pro has created for your business.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {TABS.map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              backgroundColor: tab === key ? "rgba(255,107,53,0.1)" : "white",
              color: tab === key ? ORANGE : SLATE,
              border: `1px solid ${tab === key ? ORANGE : MIST}`,
            }}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Content list */}
      {loading ? (
        <p className="text-sm py-8 text-center" style={{ color: SLATE }}>
          Loading content...
        </p>
      ) : filteredItems.length === 0 ? (
        <Card className="border" style={{ borderColor: MIST }}>
          <CardContent className="p-8 text-center">
            <p className="text-sm" style={{ color: SLATE }}>
              No {TABS.find((t) => t.key === tab)?.label.toLowerCase()} yet.
              {tab === "posts"
                ? " Pro creates weekly Google posts automatically."
                : tab === "pages"
                ? " Pro builds city pages for your service areas."
                : tab === "reviews"
                ? " Review response drafts appear here when you get new reviews."
                : " Pro publishes blog posts twice a month."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item, i) => (
            <Card
              key={item.id || i}
              className="border bg-white transition-all hover:shadow-sm"
              style={{ borderColor: MIST }}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm mb-1" style={{ color: NAVY }}>
                      {item.title}
                    </p>
                    {item.content && (
                      <p
                        className="text-xs line-clamp-2 mb-2"
                        style={{ color: SLATE }}
                      >
                        {item.content}
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: SLATE }}>
                        {new Date(item.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      {item.status && (
                        <Badge
                          className="text-[10px]"
                          style={{
                            backgroundColor:
                              item.status === "published"
                                ? "rgba(34,197,94,0.1)"
                                : "rgba(255,107,53,0.1)",
                            color:
                              item.status === "published" ? "#16a34a" : ORANGE,
                          }}
                        >
                          {item.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {item.content && <CopyButton text={item.content} />}
                    {(item.url || item.slug) && (
                      <a
                        href={item.url || `/blog/${item.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs gap-1"
                          style={{ color: NAVY }}
                        >
                          <ExternalLink size={12} />
                          View
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Link to old detailed views for power users */}
      <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${MIST}` }}>
        <p className="text-xs mb-3" style={{ color: SLATE }}>
          Need more control? Access detailed tools:
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { href: "/dashboard/posts", label: "Post Builder" },
            { href: "/dashboard/pages", label: "Page Builder" },
            { href: "/dashboard/blog", label: "Blog Manager" },
            { href: "/dashboard/reviews", label: "Review Manager" },
            { href: "/dashboard/ai-readiness", label: "AI Readiness" },
            { href: "/dashboard/faq", label: "FAQ Builder" },
            { href: "/dashboard/schema", label: "Schema" },
            { href: "/dashboard/llms-txt", label: "llms.txt" },
            { href: "/dashboard/competitors", label: "Competitors" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-white"
              style={{ color: ORANGE, border: `1px solid ${MIST}` }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
