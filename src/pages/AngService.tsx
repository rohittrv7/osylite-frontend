import MasonryFeed from "@/components/MasonryFeed";
import { Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import type { ExploreFilters, PostCategory } from "@/types/post";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetExploreServicesQuery } from "@/store/api/associateApi";
import JobFeedPage from "@/pages/JobFeedPage";
import { SERVICE_CATEGORY, type ServiceCategory } from "@/types/content";
import MatrimonyFeedPage from "./MatrimonyFeedPage";
import Index from "./property/Index";
import Courier from "./courier/Courier";
import WalletHome from "./wallet/WalletHome";

export default function AngService() {
  const location = useLocation();

  const state = location.state as {
    category?: PostCategory | ServiceCategory;
  } | null;
  const category = state?.category;

  const isJobSearch = category === SERVICE_CATEGORY.SEARCH_JOB;
  const isMatrimonySearch = category === SERVICE_CATEGORY.MATRIMONY;
  const isProperty = category === SERVICE_CATEGORY.PROPERTY;
  const isCourier = category === SERVICE_CATEGORY.BOOK_COURIER;
  const isAngToken = category === SERVICE_CATEGORY.ANG_TOKEN;

  const filters: ExploreFilters | typeof skipToken =
    category && !isJobSearch
      ? { category: category as PostCategory }
      : skipToken;

  const { data: posts = [], isLoading } = useGetExploreServicesQuery(filters);

  if (isJobSearch) {
    return <JobFeedPage />;
  }

  if (isMatrimonySearch) {
    return <MatrimonyFeedPage />;
  }

  if (isCourier) return <Courier />;

  if (isProperty) {
    return <Index />;
  }

  if (isAngToken) {
    return <WalletHome />;
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container mx-auto px-4 py-3">
        <h1 className="text-2xl font-bold mb-4">Ang Service</h1>

        {isLoading && (
          <div className="flex flex-col items-center py-20 gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Curating your feed...</p>
          </div>
        )}

        {!isLoading && posts.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No posts found
          </div>
        )}

        {!isLoading && posts.length > 0 && <MasonryFeed posts={posts} />}
      </div>
    </div>
  );
}
