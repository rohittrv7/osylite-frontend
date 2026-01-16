// components/EventCard.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Heart, MessageCircle, Share2, Pencil } from "lucide-react";

interface EventCardProps {
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  views: number;
  likes: number;
  comments: number;
}

export function EventCard({
  title,
  category,
  imageUrl,
  description,
  views,
  likes,
  comments,
}: EventCardProps) {
  return (
    <Card className="overflow-hidden bg-card border-border shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="p-4 pb-2 flex flex-row items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/logo.png" alt="ANG Growth" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            ANG
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-lg">ANG Growth</h3>
          <p className="text-sm text-muted-foreground">{category}</p>
        </div>
      </CardHeader>

      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-4">
          <h2 className="text-xl md:text-2xl font-bold text-white drop-shadow-md">
            {title}
          </h2>
        </div>
      </div>

      <CardContent className="p-4 pt-4 space-y-4">
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3">
          {description}
        </p>

        <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
          <div className="flex gap-5 md:gap-6">
            <div className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" /> {views}
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="h-4 w-4" /> {likes}
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4" /> {comments}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto text-muted-foreground hover:text-primary"
          >
            <Share2 className="h-4 w-4 mr-1.5" /> Share
          </Button>
        </div>

        <div className="relative">
          <Input
            placeholder="Write Your Comment"
            className="bg-background border-input pr-10 text-sm"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-3 pt-1">
          <Button className="flex-1 text-sm md:text-base">Post</Button>
          <Button variant="outline" className="flex-1 text-sm md:text-base">
            Participation Form
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
