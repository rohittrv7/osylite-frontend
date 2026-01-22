import {
  Heart,
  MessageCircle,
  Eye,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Reel {
  id: string;
  fileUrl: string;
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  caption?: string | null;
}

export default function ReelViewer({ reels }: { reels: Reel[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const userPausedRef = useRef<Record<string, boolean>>({});

  const [pausedMap, setPausedMap] = useState<Record<string, boolean>>({});
  const [muted, setMuted] = useState(true);
  const [likedId, setLikedId] = useState<string | null>(null);
  const [openComments, setOpenComments] = useState<string | null>(null);

  /* ===============================
     AUTO PLAY ON SCROLL (FIXED)
  =============================== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id");
          if (!id) return;

          const video = videoRefs.current[id];
          if (!video) return;

          if (entry.isIntersecting) {
            // ⛔ respect manual pause
            if (userPausedRef.current[id]) return;

            Object.values(videoRefs.current).forEach((v) => v?.pause());
            video.play();
            setPausedMap({ [id]: false });
          } else {
            video.pause();
            setPausedMap((p) => ({ ...p, [id]: true }));
          }
        });
      },
      { threshold: 0.75 },
    );

    const nodes = containerRef.current?.querySelectorAll("[data-id]");
    nodes?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  /* ===============================
     PLAY / PAUSE CLICK (FIXED)
  =============================== */
  const togglePlay = (id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;

    Object.values(videoRefs.current).forEach((v) => v?.pause());

    if (video.paused) {
      userPausedRef.current[id] = false;
      video.play();
      setPausedMap({ [id]: false });
    } else {
      userPausedRef.current[id] = true;
      video.pause();
      setPausedMap({ [id]: true });
    }
  };

  /* ===============================
     DOUBLE TAP LIKE
  =============================== */
  const handleDoubleTap = (id: string) => {
    setLikedId(id);
    setTimeout(() => setLikedId(null), 700);
  };

  return (
    <div className="flex justify-center">
      <div
        ref={containerRef}
        className="h-[620px] overflow-y-scroll snap-y snap-mandatory scrollbar-hide space-y-6"
      >
        {reels.map((reel) => {
          const isPaused = pausedMap[reel.id];

          return (
            <div
              key={reel.id}
              data-id={reel.id}
              className="
                snap-center
                relative
                mx-auto
                w-[340px]
                h-[600px]
                bg-black
                rounded-xl
                overflow-hidden
                cursor-pointer
              "
              onClick={() => togglePlay(reel.id)}
              onDoubleClick={() => handleDoubleTap(reel.id)}
            >
              {/* VIDEO */}
              <video
                ref={(el) => {
                  videoRefs.current[reel.id] = el;
                }}
                src={reel.fileUrl}
                muted={muted}
                loop
                playsInline
                className="h-full w-full object-cover"
              />

              {/* ▶ PLAY OVERLAY */}
              {isPaused && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-20">
                  <Play className="h-14 w-14 text-white" fill="white" />
                </div>
              )}

              {/* ❤️ DOUBLE TAP LIKE */}
              {likedId === reel.id && (
                <div className="absolute inset-0 flex items-center justify-center z-30">
                  <Heart className="h-24 w-24 text-red-500 fill-red-500 animate-ping" />
                </div>
              )}

              {/* RIGHT ACTIONS */}
              <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4 text-white z-30">
                <div className="flex flex-col items-center text-xs">
                  <Heart className="h-6 w-6" />
                  {reel.likesCount}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenComments(reel.id);
                  }}
                  className="flex flex-col items-center text-xs"
                >
                  <MessageCircle className="h-6 w-6" />
                  {reel.commentsCount}
                </button>

                <div className="flex flex-col items-center text-xs">
                  <Eye className="h-6 w-6" />
                  {reel.viewsCount}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMuted((m) => !m);
                  }}
                >
                  {muted ? <VolumeX /> : <Volume2 />}
                </button>
              </div>

              {/* CAPTION */}
              {reel.caption && (
                <div className="absolute bottom-4 left-4 right-16 text-white text-sm line-clamp-2 z-30">
                  {reel.caption}
                </div>
              )}

              {/* COMMENT BOTTOM SHEET */}
              {openComments === reel.id && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-0 left-0 right-0 h-[45%] bg-background rounded-t-xl p-4 z-40"
                >
                  <div className="text-sm font-semibold mb-2">Comments</div>
                  <div className="text-xs text-muted-foreground">
                    Comment list here...
                  </div>

                  <button
                    className="absolute top-2 right-3 text-sm"
                    onClick={() => setOpenComments(null)}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
