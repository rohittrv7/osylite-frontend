// import { useState } from "react";
// import { UserPlus } from "lucide-react";
// import { suggestedFriends, type Friend } from "@/types/friend";
// import { toast } from "sonner";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "../ui/carousel";
// import FriendSuggestionCard from "./FriendSuggestionCard";

// const MAX_SUGGESTIONS = 16;

// const FriendSuggestion = () => {
//   const [suggestions, setSuggestions] = useState<Friend[]>(
//     suggestedFriends.slice(0, MAX_SUGGESTIONS),
//   );

//   const handleAddFriend = (id: string) => {
//     const friend = suggestions.find((f) => f.id === id);
//     if (friend) {
//       toast(`You sent a friend request to ${friend.name}`);
//     }
//   };

//   const handleRemove = (id: string) => {
//     setSuggestions((prev) => prev.filter((f) => f.id !== id));
//   };

//   return (
//     <div className="bg-background">
//       {/* <Header /> */}

//       <main className="mx-auto py-6">
//         {/* Page Header */}
//         <div className="py-2">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="p-2 bg-primary/10 rounded-lg">
//               <UserPlus className="w-6 h-6 text-primary" />
//             </div>
//             <h1 className="text-2xl font-bold text-foreground">
//               People You May Know
//             </h1>
//           </div>
//           <p className="text-muted-foreground">
//             Connect with friends and expand your network
//           </p>
//         </div>

//         {/* Suggestions Carousel */}
//         {suggestions.length > 0 ? (
//           <div>
//             <Carousel
//               opts={{
//                 align: "start",
//                 loop: false,
//               }}
//               className="w-full"
//             >
//               <CarouselContent className="-ml-2 md:-ml-4">
//                 {suggestions.map((friend, index) => (
//                   <CarouselItem
//                     key={friend.id}
//                     className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
//                   >
//                     <div
//                       className="animate-fade-in"
//                       style={{ animationDelay: `${index * 50}ms` }}
//                     >
//                       <FriendSuggestionCard
//                         friend={friend}
//                         onAddFriend={handleAddFriend}
//                         onRemove={handleRemove}
//                       />
//                     </div>
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>
//               <CarouselPrevious className="left-0" />
//               <CarouselNext className="right-0" />
//             </Carousel>
//           </div>
//         ) : (
//           <div className="text-center py-16 bg-card rounded-xl">
//             <UserPlus className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
//             <h3 className="text-lg font-semibold text-foreground mb-2">
//               No more suggestions
//             </h3>
//             <p className="text-muted-foreground">
//               Check back later for more friend suggestions
//             </p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default FriendSuggestion;

import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import FriendSuggestionCard from "./FriendSuggestionCard";
import {
  useGetFriendSuggestionsQuery,
  useSendFriendRequestMutation,
} from "@/store/api/friendsApi";

const FriendSuggestion = () => {
  const { data, isLoading } = useGetFriendSuggestionsQuery();
  const [sendRequest] = useSendFriendRequestMutation();

  const handleAddFriend = async (id: string, name: string) => {
    try {
      await sendRequest(id).unwrap();
      toast.success(`Friend request sent to ${name}`);
    } catch {
      toast.error("Failed to send friend request");
    }
  };

  if (isLoading) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        Loading suggestions...
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16 bg-card rounded-xl">
        <UserPlus className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-semibold">No suggestions</h3>
        <p className="text-muted-foreground">
          Check back later for more people
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background px-5">
      <main className="mx-auto py-6">
        {/* Header */}
        <div className="py-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <UserPlus className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">People You May Know</h1>
          </div>
          <p className="text-muted-foreground">
            Connect with friends and expand your network
          </p>
        </div>

        {/* Carousel */}
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {data.map((friend) => (
              <CarouselItem
                key={friend.id}
                className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <FriendSuggestionCard
                  friend={friend}
                  onAddFriend={handleAddFriend}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </main>
    </div>
  );
};

export default FriendSuggestion;
