import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const posts = [
  {
    username: "Myrk",
    content:
      "अमेरिका ने वेनेजुएला पर नियंत्रण कर लिया है। इससे दुनिया के तेल भंडार पर उसका कब्जा हो गया है...",
    likes: 1,
    comments: 0,
  },
];

export default function ANGWallTabs() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">ANG Wall</h1>
        <p className="text-muted-foreground">
          Public posts, videos & reels
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="post" className="w-full">
        <TabsList
          className={cn(
            "w-full justify-start rounded-none border-b bg-transparent p-0 h-12",
            "grid grid-cols-3"
          )}
        >
          <TabsTrigger
            value="post"
            className={cn(
              "relative flex-1 rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-3 text-base font-medium text-muted-foreground shadow-none transition-all",
              "data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            )}
          >
            Post
          </TabsTrigger>

          <TabsTrigger
            value="video"
            className={cn(
              "relative flex-1 rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-3 text-base font-medium text-muted-foreground shadow-none transition-all",
              "data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            )}
          >
            Video
          </TabsTrigger>

          <TabsTrigger
            value="reel"
            className={cn(
              "relative flex-1 rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-3 text-base font-medium text-muted-foreground shadow-none transition-all",
              "data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            )}
          >
            Reel
          </TabsTrigger>
        </TabsList>

        <TabsContent value="post" className="mt-6">
          <div className="space-y-8">
            {posts.map((post, idx) => (
              <div key={idx} className="border rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    M
                  </div>
                  <div>
                    <p className="font-semibold">{post.username}</p>
                    <p className="text-xs text-muted-foreground">M</p>
                  </div>
                </div>

                <p className="text-base leading-relaxed mb-4">
                  {post.content}
                </p>

                <div className="bg-muted h-64 rounded-md flex items-center justify-center mb-4">
                  <p className="text-muted-foreground">Image / Media Placeholder</p>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <button>Like {post.likes > 0 ? post.likes : ""}</button>
                  <button>Dislike</button>
                  <button>Comment {post.comments > 0 ? post.comments : ""}</button>
                </div>

                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Write a comment"
                    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="video" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-black h-64 flex items-center justify-center">
                <p className="text-white">Video Placeholder</p>
              </div>
              <div className="p-4">
                <p className="font-medium">6 High Income Skills That AI Won't Replace in 2026</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Expert Coaching • Creative Marketing • Emotional Intelligence...
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reel" className="mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <p className="text-center text-sm">Reel 1</p>
            </div>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <p className="text-center text-sm">Reel 2 - Modern House</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}