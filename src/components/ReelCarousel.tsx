import { useState } from "react";
import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";
import type { ReelResponse } from "@/types/reel";
import { useNavigate } from "react-router-dom";

export default function ReelCarousel({ stories }: { stories: ReelResponse[] | undefined }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [activeStory, setActiveStory] = useState<ReelResponse | null>(null);

  const handleOpen = (story: ReelResponse) => {
    setActiveStory(story);
    setOpen(true);
  };

  return (
    <>
      <ScrollArea className="w-full whitespace-nowrap relative">
        <div className="flex gap-4">
          {stories?.map((story) => (
            <button
              key={story.id}
              onClick={() => handleOpen(story)}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
              <div className="p-[2px] rounded-full border-[3px] border-orange-500">
                <Avatar className="h-[88px] w-[88px] border-2 border-background">
                  <AvatarImage src={story.thumbnailUrl} />
                  <AvatarFallback>
                    {story.channel.user.fullName[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <span className="text-xs text-muted-foreground max-w-[64px] truncate">
                {story.channel.user.fullName}
              </span>
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* ---- Story Viewer (like Instagram) ---- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPortal>
          <DialogOverlay />
          <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md h-[85vh] translate-x-[-50%] translate-y-[-50%] bg-black rounded-lg overflow-hidden focus:outline-none">
            {activeStory && (
              <>
                {/* ---- Video (FULL SCREEN) ---- */}
                <video
                  src={activeStory.fileUrl}
                  autoPlay
                  playsInline
                  muted={false}
                  className="absolute inset-0 w-full h-full object-contain"
                />

                {/* ---- Header : User Info (Overlay) ---- */}
                <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-3 p-3 bg-gradient-to-b from-black/70 to-transparent">
                  <button
                    onClick={() =>
                      navigate(`/profile/${activeStory.channel.user.id}`)
                    }
                    className="flex items-center gap-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={activeStory.channel.logoUrl ?? undefined}
                      />
                      <AvatarFallback>
                        {activeStory.channel.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="text-left">
                      <p className="text-sm font-medium text-white leading-none">
                        {activeStory.channel.name}
                      </p>
                      <p className="text-xs text-white/70">
                        @{activeStory.channel.handle}
                      </p>
                    </div>
                  </button>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-3 right-3 z-20 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </>
            )}
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </>
  );
}
