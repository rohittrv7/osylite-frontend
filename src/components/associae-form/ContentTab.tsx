// src/components/associates/ContentTab.tsx
import { Card, CardContent } from "@/components/ui/card";
import { useGetAssociateContentQuery } from "@/store/api/associateApi";
import { PlayCircle, Image as ImageIcon, Loader2 } from "lucide-react";

interface ContentTabProps {
  associateId: string;
  type: "post" | "video" | "reel";
}

export const ContentTab = ({ associateId, type }: ContentTabProps) => {
  const {
    data: content,
    isLoading,
    isError,
  } = useGetAssociateContentQuery({
    id: associateId,
    type,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load content.
      </div>
    );
  }

  if (!content || content.length === 0) {
    return (
      <Card>
        <CardContent className="p-10 text-center text-muted-foreground">
          {type === "video" || type === "reel" ? (
            <PlayCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
          ) : (
            <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
          )}
          <p className="text-sm capitalize">No {type}s yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {content.map((item) => (
        <Card
          key={item.id}
          className="overflow-hidden group cursor-pointer hover:shadow-md transition-all"
        >
          <div className="aspect-square relative bg-gray-100">
            {/* Handle Image or Video Preview */}
            {item.fileUrl && item.fileUrl.length > 0 ? (
              type === "post" ? (
                <img
                  src={item.fileUrl[0]}
                  alt={item.title || "Post"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black">
                  <video
                    src={item.fileUrl[0]}
                    className="w-full h-full object-cover opacity-80"
                    muted
                  />
                  <PlayCircle className="absolute w-10 h-10 text-white opacity-80" />
                </div>
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <ImageIcon className="w-8 h-8" />
              </div>
            )}

            {/* Price Badge for Products */}
            {item.price && Number(item.price) > 0 && (
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                ₹{Number(item.price).toLocaleString()}
              </div>
            )}
          </div>
          <CardContent className="p-3">
            <h4 className="font-medium text-sm line-clamp-1">
              {item.title || "Untitled"}
            </h4>
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <span className="capitalize">{item.category}</span>
              <span>•</span>
              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
