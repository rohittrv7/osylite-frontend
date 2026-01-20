import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Plus, Image, Film, Video } from "lucide-react";
import CreatePostDialog from "./CreatePostDialog";

export default function CreateMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon">
          <Plus className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <CreatePostDialog
          type="post"
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Image className="mr-2 h-4 w-4" /> Post
            </DropdownMenuItem>
          }
        />

        <CreatePostDialog
          type="reel"
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Film className="mr-2 h-4 w-4" /> Reel
            </DropdownMenuItem>
          }
        />

        <CreatePostDialog
          type="video"
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Video className="mr-2 h-4 w-4" /> Video
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
