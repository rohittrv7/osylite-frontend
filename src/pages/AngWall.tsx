import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";

const posts = [
  { id: 1, title: "High Income Skills", img: "/img1.png", likes: 1 },
  { id: 2, title: "Business Success", img: "/img2.png", likes: 2 },
  { id: 3, title: "News", img: "/img3.png", likes: 0 },
];

export default function ANGWall() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center">ANG Wall</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {posts.map((p) => (
          <Card key={p.id} className="shadow-lg">
            <CardHeader className="font-semibold">{p.title}</CardHeader>
            <CardContent>
              <img src={p.img} className="rounded-lg" />
              <div className="flex gap-4 mt-4">
                <Button size="sm">
                  <ThumbsUp /> {p.likes}
                </Button>
                <Button size="sm" variant="outline">
                  <ThumbsDown />
                </Button>
              </div>
              <input
                placeholder="Write a comment"
                className="w-full mt-3 border p-2 rounded"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
