import {
  Copy,
  Play,
  Eye,
  Heart,
  MoreVertical,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import { PreviewModal } from "./PreviewModal";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from "@/store/api/postsApi";
import { toast } from "sonner";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";

// 🔹 Types
export interface CreatePostDto {
  type: "post" | "video" | "reel";
  fileUrl: string[];
  thumbnailUrl?: string;
  title?: string;
  caption?: string;
  description?: string;
  location?: string;
}

export interface MediaItem {
  id: string;
  userId: string;
  url: string;
  fileUrl: string[];
  thumbnailUrl: string | null;
  type: "post" | "video" | "reel";
  caption: string | null;
  description?: string;
  location?: string;
  title?: string;
  status: "pending" | "approved" | "rejected";
  stats: { likes: number; comments: number; views: number };
  createdAt: string;
}

interface MediaGridProps {
  items: MediaItem[];
  isReel?: boolean;
  userId: string;
}

export default function MediaGrid({
  items = [],
  isReel = false,
  userId,
}: MediaGridProps) {
  const [preview, setPreview] = useState<{
    open: boolean;
    urls: string[];
    type: MediaItem["type"];
  }>({ open: false, urls: [], type: "post" });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<MediaItem | null>(null);

  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deletePost(deleteId).unwrap();
      toast.success("Post deleted!");
      setDeleteId(null);
    } catch (err) {
      apiErrorToastHandler(err);
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-1 md:gap-4">
        {items.map((item) => {
          const isOwner = item.userId === userId;
          const isVideo = item.type === "video" || item.type === "reel";
          const isBlocked = item.status !== "approved";

          return (
            <div
              key={item.id}
              className={cn(
                "relative group overflow-hidden rounded-xl bg-muted transition-all border border-border/50 shadow-sm",
                isReel ? "aspect-[9/16]" : "aspect-square",
              )}
            >
              {/* Media Thumb Triggering Preview */}
              <div
                className="w-full h-full cursor-pointer overflow-hidden"
                onClick={() =>
                  setPreview({
                    open: true,
                    urls: item.fileUrl,
                    type: item.type,
                  })
                }
              >
                <img
                  src={
                    item.type === "post"
                      ? item.fileUrl[0]
                      : item.thumbnailUrl || item.fileUrl[0]
                  }
                  className={cn(
                    "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
                    isBlocked && "opacity-60",
                  )}
                  alt="media"
                />
              </div>

              {/* Action Menu - Owner Specific */}
              {isOwner && (
                <div
                  className="absolute top-2 right-2 z-50"
                  onClick={(e) => e.stopPropagation()} // Prevents preview click bubbling
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 rounded-lg bg-black/60 text-white hover:bg-black/90 backdrop-blur-md border border-white/20 shadow-lg"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-36 font-black uppercase italic text-[10px] rounded-xl border-2"
                    >
                      <DropdownMenuItem
                        onClick={() => setEditItem(item)}
                        className="cursor-pointer gap-2 py-2.5"
                      >
                        <Pencil className="h-3.5 w-3.5 text-primary" /> Edit
                        Post
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeleteId(item.id)}
                        className="cursor-pointer text-destructive focus:text-destructive gap-2 py-2.5"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              {/* Multiple Image Indicator */}
              {item.type === "post" && item.fileUrl.length > 1 && (
                <div className="absolute top-2 left-2 text-white bg-black/40 p-1.5 rounded-lg backdrop-blur-sm z-10">
                  <Copy size={12} className="rotate-90" />
                </div>
              )}

              {/* Video Play Icon */}
              {isVideo && (
                <div className="absolute bottom-2 left-2 text-white bg-black/50 p-2 rounded-full border border-white/20 backdrop-blur-md z-10">
                  <Play size={12} fill="currentColor" />
                </div>
              )}

              {/* Hover Stats */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white text-xs pointer-events-none font-black italic z-20">
                <div className="flex items-center gap-1.5">
                  <Heart size={16} fill="white" /> {item.stats.likes}
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye size={16} /> {item.stats.views}
                </div>
              </div>

              {/* Status Indicator */}
              {isBlocked && (
                <div
                  className={cn(
                    "absolute top-2 left-2 px-2 py-0.5 rounded text-[8px] font-black uppercase text-white tracking-widest z-30",
                    item.status === "pending" ? "bg-yellow-600" : "bg-red-600",
                  )}
                >
                  {item.status}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 🔹 EDIT MODAL (Scrollable & rounded-xl) */}
      <EditPostModal
        key={editItem?.id || "empty"} // 🔹 YE LINE ERROR FIX KAREGI
        item={editItem}
        open={!!editItem}
        onClose={() => setEditItem(null)}
      />

      {/* 🔹 SMALL DELETE MODAL */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="max-w-[320px] rounded-xl border-2 p-8 shadow-2xl">
          <AlertDialogHeader className="space-y-4 text-center">
            <div className="w-14 h-14 bg-destructive/10 rounded-xl flex items-center justify-center text-destructive mx-auto">
              <Trash2 size={28} />
            </div>
            <AlertDialogTitle className="font-black italic uppercase text-lg leading-tight text-foreground">
              Delete Post?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[10px] font-bold uppercase opacity-60 leading-relaxed">
              Permanent action. No recovery possible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:flex-col gap-2 mt-6">
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
              className="w-full rounded-xl bg-destructive hover:bg-destructive/90 h-12 font-black uppercase italic text-xs"
            >
              {isDeleting ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                "Delete Forever"
              )}
            </AlertDialogAction>
            <AlertDialogCancel className="w-full rounded-xl border-2 font-black uppercase italic text-xs h-12">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <PreviewModal
        open={preview.open}
        urls={preview.urls}
        type={preview.type}
        onClose={() => setPreview((p) => ({ ...p, open: false }))}
      />
    </>
  );
}

// 🔹 EDIT COMPONENT (Scrollable, rounded-xl, Description Commented)
// 🔹 FIXED EDIT COMPONENT (NO useEffect, NO CASCADING ERROR)
function EditPostModal({
  item,
  open,
  onClose,
}: {
  item: MediaItem | null;
  open: boolean;
  onClose: () => void;
}) {
  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const [form, setForm] = useState<Partial<CreatePostDto>>({
    title: item?.title || "",
    caption: item?.caption || "",
    description: item?.description || "",
    location: item?.location || "",
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;
    try {
      await updatePost({ id: item.id, body: form }).unwrap();
      toast.success("Post updated!");
      onClose();
    } catch (err) {
      apiErrorToastHandler(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[90vh] rounded-xl border-2 bg-card p-0 overflow-hidden flex flex-col shadow-2xl">
        <DialogHeader className="p-6 bg-muted/40 border-b shrink-0">
          <DialogTitle className="font-black italic uppercase text-xl flex items-center gap-2 text-foreground">
            <Pencil className="text-primary w-5 h-5" /> Edit {item?.type}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 overflow-y-auto">
          <form onSubmit={handleUpdate} className="p-8 space-y-6">
            {item && (
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">
                  Media Preview
                </Label>
                {item.type === "post" ? (
                  <div className="grid grid-cols-3 gap-2 rounded-xl border-2 border-dashed p-2 bg-muted/20">
                    {item.fileUrl.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        className="aspect-square rounded-lg object-cover border"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border-2 border-dashed p-2 bg-muted/20">
                    <img
                      src={item.thumbnailUrl || item.fileUrl[0]}
                      className="aspect-video w-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-40">
                      <Play size={40} fill="white" />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">
                Caption
              </Label>
              <Input
                value={form.caption || ""}
                onChange={(e) => setForm({ ...form, caption: e.target.value })}
                className="h-12 rounded-xl border-2 font-bold bg-background text-foreground"
              />
            </div>

            {/* <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">
                Location
              </Label>
              <Input
                value={form.location || ""}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="h-12 rounded-xl border-2 font-bold bg-background text-foreground"
              />
            </div> */}

            <div className="flex gap-4 pt-4 border-t sticky bottom-0 bg-card py-2 border-border/50">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 rounded-xl h-12 font-black uppercase italic text-xs"
              >
                Discard
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 rounded-xl h-12 font-black uppercase italic text-xs bg-primary text-primary-foreground shadow-xl"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  "Save Updates"
                )}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
