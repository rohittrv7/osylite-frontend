import { FeedList } from "@/components/feed/FeedList";
import { FeedTabs } from "@/components/feed/FeedTabs";
import type { ContentType } from "@/types/feed";
import { useState } from "react";

export default function ExploreFeed() {
  const [activeTab, setActiveTab] = useState<ContentType>("post");

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Explore</h1>

        <FeedTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="container max-w-7xl mx-auto px-4 py-6">
          <FeedList type={activeTab} />
        </main>
      </div>
    </div>
  );
}
