type Props = {
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  views: number;
  likes: number;
  comments: number;
  channelLogo?: string | null;
  isEnquiryPost?: boolean;
  ctaLabel?: string;
};

export function EventCard({
  title,
  category,
  imageUrl,
  description,
  views,
  likes,
  comments,
  channelLogo,
  isEnquiryPost,
  ctaLabel,
}: Props) {
  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <img src={imageUrl} className="h-48 w-full object-cover" />

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          {channelLogo && (
            <img src={channelLogo} className="h-8 w-8 rounded-full" />
          )}
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-xs text-muted-foreground">{category}</p>
          </div>
        </div>

        <p className="text-sm line-clamp-3">{description}</p>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>👁 {views}</span>
          <span>❤️ {likes}</span>
          <span>💬 {comments}</span>
        </div>

        {isEnquiryPost && (
          <button className="w-full border border-green-600 text-green-600 rounded-md py-1 text-sm">
            {ctaLabel || "Enquiry"}
          </button>
        )}
      </div>
    </div>
  );
}
