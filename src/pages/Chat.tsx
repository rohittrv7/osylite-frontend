import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Search,
  MoreVertical,
  Phone,
  Video,
  Smile,
  Paperclip,
  Mic,
  Send,
  User,
  Moon,
  Sun,
  ArrowLeft,
  Camera,
  CheckCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

type Message = {
  id: string;
  text: string;
  timestamp: string;
  isSent: boolean;
  isRead?: boolean;
  sender?: string;
};

type Chat = {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar: string;
  unreadCount?: number;
  isOnline?: boolean;
  isGroup?: boolean;
  isArchived?: boolean;
  participants?: string[];
  admins?: string[];
  description?: string;
};

// type Contact = {
//   id: string;
//   name: string;
//   avatar: string;
//   phone: string;
//   about: string;
// };

// ──────────────────────────────────────────────
// Dummy Data (you can move to separate file)
// ──────────────────────────────────────────────

const currentUser = {
  id: "me",
  name: "Rohit",
  avatar: "/placeholder-user.jpg",
  about: "Patna → Code → Chai",
};

// const contacts: Contact[] = [
//   { id: "1", name: "John Doe", avatar: "/p1.jpg", phone: "+91 98765 43210", about: "Hey there! I am using WhatsApp." },
//   { id: "2", name: "Priya Singh", avatar: "/p2.jpg", phone: "+91 87654 32109", about: "Busy with deadlines 😅" },
//   { id: "3", name: "Team Backend", avatar: "/group1.jpg", phone: "", about: "API & DB discussions" },
// ];

const chats: Chat[] = [
  {
    id: "1",
    name: "John Doe",
    lastMessage: "Bro kal milte hain?",
    timestamp: "10:12 PM",
    avatar: "/p1.jpg",
    unreadCount: 3,
    isOnline: true,
    isGroup: false,
  },
  {
    id: "2",
    name: "Priya Singh",
    lastMessage: "Project file bhej diya",
    timestamp: "9:45 PM",
    avatar: "/p2.jpg",
    isOnline: false,
    isGroup: false,
  },
  {
    id: "3",
    name: "Team Backend",
    lastMessage: "New endpoint ready hai",
    timestamp: "Yesterday",
    avatar: "/group1.jpg",
    unreadCount: 7,
    isGroup: true,
    participants: ["1", "2", "me"],
    admins: ["me"],
    description: "Backend + DevOps squad",
  },
];

const messagesByChat: Record<string, Message[]> = {
  "1": [
    { id: "m1", text: "Kal 2 baje milte hain?", timestamp: "10:05 PM", isSent: false },
    { id: "m2", text: "Haan bhai pakka", timestamp: "10:06 PM", isSent: true, isRead: true },
    { id: "m3", text: "Chai peene chalega?", timestamp: "10:10 PM", isSent: false },
    { id: "m4", text: "Chalega 🔥", timestamp: "10:12 PM", isSent: true, isRead: false },
  ],
  "3": [
    { id: "m5", text: "Prisma setup ho gaya", timestamp: "8:55 PM", isSent: true, isRead: true, sender: "Rohit" },
    { id: "m6", text: "Nice! Kal deploy kar denge", timestamp: "9:02 PM", isSent: false, sender: "Aman" },
  ],
};

const emojis = ["😀", "😂", "😍", "🥳", "🔥", "👍", "❤️", "🎉", "🤔", "😢", "💪", "✨"];

// ──────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────

export default function ModernWhatsApp() {
  const [selectedChatId, setSelectedChatId] = useState("1");
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSidebarMenu, setShowSidebarMenu] = useState(false);
  const [showChatMenu, setShowChatMenu] = useState(false);
  // const [viewArchived, setViewArchived] = useState(false);

  const currentChat = chats.find((c) => c.id === selectedChatId);
  const currentMessages = messagesByChat[selectedChatId] || [];

  const sendMessage = () => {
    if (!message.trim()) return;
    // In real app → append to messagesByChat + API call
    console.log("→", message);
    setMessage("");
    setShowEmoji(false);
  };

  const visibleChats = chats
  //   ? chats.filter((c) => c.isArchived)
  //   : chats.filter((c) => !c.isArchived);

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* ─── Sidebar ──────────────────────────────────────────────── */}
      <div className="hidden w-80 border-r bg-card md:flex md:flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-3">
          <Avatar className="h-10 w-10 cursor-pointer" onClick={() => setShowProfile(true)}>
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
          </Avatar>

          <DropdownMenu open={showSidebarMenu} onOpenChange={setShowSidebarMenu}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
             </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {/* <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" /> New Group
              </DropdownMenuItem> */}
              <DropdownMenuItem onClick={() => setShowProfile(true)}>
                <User className="mr-2 h-4 w-4" /> Profile
              </DropdownMenuItem>
              {/* <DropdownMenuItem onClick={() => setShowSettings(true)}>
                <Settings className="mr-2 h-4 w-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setViewArchived(!viewArchived)}>
                <Archive className="mr-2 h-4 w-4" />
                {viewArchived ? "Chats" : "Archived"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search */}
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search or start new chat" className="h-9 pl-9" />
          </div>
        </div>

        {/* Chat list */}

        <ScrollArea className="flex-1">
          {visibleChats.map((chat) => (
            <div
              key={chat.id}
              className={cn(
                "flex cursor-pointer items-center gap-3 px-3 py-2.5 hover:bg-accent/60 transition-colors",
                selectedChatId === chat.id && "bg-accent"
              )}
              onClick={() => setSelectedChatId(chat.id)}
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback>{chat.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                {chat.isOnline && !chat.isGroup && (
                  <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-baseline">
                  <p className="truncate font-medium">{chat.name}</p>
                  <span className="ml-2 text-xs text-muted-foreground shrink-0">{chat.timestamp}</span>
                </div>
                <div className="flex justify-between items-center mt-0.5">
                  <p className="truncate text-sm text-muted-foreground">{chat.lastMessage}</p>
                  {chat.unreadCount && (
                    <Badge variant="default" className="ml-2 h-5 min-w-[1.25rem] rounded-full px-1.5 text-xs font-medium">
                      {chat.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* ─── Main Chat Area ───────────────────────────────────────── */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b bg-card px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden">
              <ArrowLeft />
            </Button>
            <Avatar
              className="cursor-pointer"
              onClick={() => {
                // You can open group or contact sheet here
              }}
            >
              <AvatarImage src={currentChat?.avatar} />
              <AvatarFallback>{currentChat?.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold leading-tight">{currentChat?.name}</p>
              <p className="text-xs text-muted-foreground">
                {currentChat?.isGroup
                  ? `${currentChat.participants?.length || 0} participants`
                  : currentChat?.isOnline
                  ? "online"
                  : "last seen recently"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon"><Phone className="h-5 w-5" /></Button>
                </TooltipTrigger>
                <TooltipContent>Voice call</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon"><Video className="h-5 w-5" /></Button>
                </TooltipTrigger>
                <TooltipContent>Video call</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu open={showChatMenu} onOpenChange={setShowChatMenu}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View {currentChat?.isGroup ? "group" : "contact"} info</DropdownMenuItem>
                <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                <DropdownMenuItem>Archive chat</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Delete chat</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Messages */}
        <ScrollArea className="flex-1 bg-[url('/whatsapp-bg-light.png')] dark:bg-[url('/whatsapp-bg-dark.png')] bg-repeat">
          <div className="mx-auto max-w-3xl space-y-5 px-4 py-6">
            {currentMessages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex animate-in fade-in-0 slide-in-from-bottom-2",
                  msg.isSent ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm",
                    msg.isSent
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-secondary text-secondary-foreground rounded-bl-none"
                  )}
                >
                  {!msg.isSent && msg.sender && currentChat?.isGroup && (
                    <p className="mb-1 text-xs font-medium text-primary/80">{msg.sender}</p>
                  )}
                  <p className="text-[15px] leading-relaxed">{msg.text}</p>
                  <div className="mt-1 flex items-center justify-end gap-1.5 text-xs opacity-70">
                    <span>{msg.timestamp}</span>
                    {msg.isSent && (
                      <CheckCheck
                        className={cn(
                          "h-4 w-4",
                          msg.isRead ? "text-blue-400" : "text-muted-foreground/70"
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <footer className="border-t bg-card p-3">
          <div className="flex items-center gap-2">
            <Popover open={showEmoji} onOpenChange={setShowEmoji}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Smile className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent side="top" align="start" className="w-72 p-3">
                <div className="grid grid-cols-8 gap-2">
                  {emojis.map((e) => (
                    <button
                      key={e}
                      className="text-3xl transition hover:scale-125"
                      onClick={() => {
                        setMessage((prev) => prev + e);
                        setShowEmoji(false);
                      }}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Paperclip className="h-5 w-5" />
            </Button>

            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="h-10 rounded-full px-4"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />

            {message.trim() ? (
              <Button size="icon" className="h-10 w-10 rounded-full" onClick={sendMessage}>
                <Send className="h-5 w-5" />
              </Button>
            ) : (
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Mic className="h-5 w-5" />
              </Button>
            )}
          </div>
        </footer>
      </div>

      {/* ─── Profile Sheet (example) ──────────────────────────────── */}
      <Sheet open={showProfile} onOpenChange={setShowProfile}>
        <SheetContent className="px-5">
          <SheetHeader>
            <SheetTitle>Profile</SheetTitle>
          </SheetHeader>
          <div className="mt-8 flex flex-col items-center gap-6">
            <div className="relative">
              <Avatar className="h-28 w-28 ring-2 ring-primary/20">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="w-full space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input defaultValue={currentUser.name} className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">About</label>
                <Input defaultValue={currentUser.about} className="mt-1" />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Settings Sheet */}
      <Sheet open={showSettings} onOpenChange={setShowSettings}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Settings</SheetTitle>
          </SheetHeader>
          <div className="space-y-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span>Dark Mode</span>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            <Separator />
            <div className="space-y-4">
              <h4 className="font-medium">Notifications</h4>
              {/* more settings... */}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}