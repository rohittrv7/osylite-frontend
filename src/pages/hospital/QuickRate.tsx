import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, CalendarDays } from "lucide-react";

const roomTypes = [
  "--ALL--", "COVID", "EMERGENCY1", "GENERAL WARD A.C", "GENERAL WARD NON A.C",
  "GYNAE WARD", "GYNAE/CH", "HDU WARD", "ICU WARD", "ICU1", "MICU",
  "PRIVATE DELUXE", "PRIVATE SUPER DELUXE", "SICU",
];

const QuickRate = () => {
  const [roomType, setRoomType] = useState("--ALL--");

  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="Quick Rate" showBack />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6 flex flex-wrap items-end gap-4">
          <div>
            <label className="mb-1 flex items-center gap-1 text-sm font-semibold text-primary-foreground bg-primary px-2 py-1 rounded-l text-xs">Date</label>
            <div className="flex">
              <Input defaultValue="07-Mar-2026 10:30" className="rounded-r-none w-48" readOnly />
              <Button variant="outline" size="icon" className="rounded-l-none"><CalendarDays className="h-4 w-4" /></Button>
            </div>
          </div>
          <div>
            <label className="mb-1 flex items-center gap-1 text-sm font-semibold bg-primary text-primary-foreground px-2 py-1 rounded-l text-xs">Service</label>
            <div className="flex">
              <Input placeholder="" className="rounded-r-none w-40" />
              <Button variant="outline" size="icon" className="rounded-l-none"><Search className="h-4 w-4" /></Button>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-muted-foreground">Type</label>
            <Select defaultValue="OPD">
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="OPD">OPD</SelectItem>
                <SelectItem value="IPD">IPD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1 flex items-center gap-1 text-sm font-semibold bg-primary text-primary-foreground px-2 py-1 rounded-l text-xs">Panel</label>
            <div className="flex">
              <Input className="rounded-r-none w-40" />
              <Button variant="outline" size="icon" className="rounded-l-none"><Search className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-4 mb-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-muted-foreground">Room Type</label>
            <Select value={roomType} onValueChange={setRoomType}>
              <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
              <SelectContent>
                {roomTypes.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-muted-foreground">Visit Type</label>
            <Select defaultValue="">
              <SelectTrigger className="w-44"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="followup">Follow Up</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1 flex items-center gap-1 text-sm font-semibold bg-primary text-primary-foreground px-2 py-1 rounded-l text-xs">Under Cons. Incharge</label>
            <div className="flex">
              <Input className="rounded-r-none w-40" />
              <Button variant="outline" size="icon" className="rounded-l-none"><Search className="h-4 w-4" /></Button>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-muted-foreground">OPD Type</label>
            <Select defaultValue="">
              <SelectTrigger className="w-44"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="special">Special</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-green-600 hover:bg-green-700 text-primary-foreground">Show</Button>
        </div>

        <div className="flex items-center justify-center py-12">
          <span className="text-lg font-bold text-destructive">Rate :</span>
        </div>
      </main>
    </div>
  );
};

export default QuickRate;
