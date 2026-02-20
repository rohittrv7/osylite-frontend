import { useState } from "react";
import {
  MessageSquare,
  Upload,
  Phone,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Complaint {
  id: string;
  date: string;
  subject: string;
  status: "Resolved" | "Pending" | "Under Review";
  thread: { sender: string; message: string; date: string }[];
}

const mockComplaints: Complaint[] = [
  {
    id: "CMP-2026-001",
    date: "15 Feb 2026",
    subject: "Parcel delayed beyond expected date",
    status: "Under Review",
    thread: [
      {
        sender: "You",
        message:
          "My parcel EM123456789IN has not arrived even after 5 days. Expected delivery was 10 Feb.",
        date: "15 Feb",
      },
      {
        sender: "Support",
        message:
          "We are investigating the delay. Your parcel is at Jaipur sorting hub. We will update you within 24 hours.",
        date: "16 Feb",
      },
    ],
  },
  {
    id: "CMP-2026-002",
    date: "10 Feb 2026",
    subject: "Damaged goods received",
    status: "Resolved",
    thread: [
      {
        sender: "You",
        message:
          "The parcel arrived in damaged condition. Contents were broken.",
        date: "10 Feb",
      },
      {
        sender: "Support",
        message:
          "We apologize for the inconvenience. A refund has been processed to your account.",
        date: "12 Feb",
      },
    ],
  },
  {
    id: "CMP-2026-003",
    date: "05 Feb 2026",
    subject: "Staff behavior complaint",
    status: "Pending",
    thread: [
      {
        sender: "You",
        message: "Rude behavior by counter staff at Connaught Place branch.",
        date: "05 Feb",
      },
    ],
  },
];

const statusColors: Record<string, string> = {
  Resolved: "bg-success text-success-foreground",
  Pending: "bg-warning text-warning-foreground",
  "Under Review": "bg-info text-info-foreground",
};

export default function ComplaintsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Helpdesk & Grievance
          </h1>
          <p className="text-muted-foreground">
            File a complaint or check existing complaint status
          </p>
        </div>

        {/* FAB */}
        <a
          href="tel:18001234567"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-hero flex items-center justify-center shadow-elevated hover:scale-105 transition-transform"
        >
          <Phone className="w-6 h-6 text-primary-foreground" />
        </a>

        <Tabs defaultValue="file" className="animate-fade-in">
          <TabsList className="w-full grid grid-cols-2 mb-8">
            <TabsTrigger value="file">File Complaint</TabsTrigger>
            <TabsTrigger value="history">My Complaints</TabsTrigger>
          </TabsList>

          {/* File Complaint */}
          <TabsContent value="file">
            {submitted ? (
              <div className="text-center py-16 animate-fade-in">
                <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  Complaint Registered!
                </h3>
                <p className="text-muted-foreground mb-1">
                  Your Complaint ID: <strong>CMP-2026-004</strong>
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  You will receive updates via email and SMS.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline">
                  File Another Complaint
                </Button>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-6 shadow-card">
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      Category
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="missing">Missing Parcel</SelectItem>
                        <SelectItem value="delay">Delivery Delay</SelectItem>
                        <SelectItem value="damaged">Damaged Goods</SelectItem>
                        <SelectItem value="staff">Staff Behavior</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">
                        Your Name
                      </Label>
                      <Input placeholder="Full Name" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">
                        Consignment No. (optional)
                      </Label>
                      <Input placeholder="EM123456789IN" />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">
                      Email
                    </Label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">
                      Describe your issue
                    </Label>
                    <Textarea
                      placeholder="Please provide detailed description of your complaint..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">
                      Attach Image (optional)
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/30 transition-colors">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag & drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() => setSubmitted(true)}
                    className="w-full h-12 gradient-hero text-primary-foreground hover:opacity-90"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" /> Submit Complaint
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Complaints History */}
          <TabsContent value="history">
            <div className="space-y-4">
              {mockComplaints.map((c) => (
                <div
                  key={c.id}
                  className="bg-card border border-border rounded-lg shadow-card overflow-hidden animate-fade-in"
                >
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === c.id ? null : c.id)
                    }
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-muted-foreground">
                          {c.id}
                        </span>
                        <Badge
                          className={`text-[10px] ${statusColors[c.status]}`}
                        >
                          {c.status}
                        </Badge>
                      </div>
                      <p className="font-semibold text-sm text-foreground">
                        {c.subject}
                      </p>
                      <p className="text-xs text-muted-foreground">{c.date}</p>
                    </div>
                    {expandedId === c.id ? (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>

                  {expandedId === c.id && (
                    <div className="border-t border-border p-4 bg-muted/30 space-y-3">
                      {c.thread.map((t, i) => (
                        <div
                          key={i}
                          className={`flex gap-3 ${t.sender === "Support" ? "" : "flex-row-reverse"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 text-sm ${
                              t.sender === "Support"
                                ? "bg-card border border-border text-foreground"
                                : "bg-primary text-primary-foreground"
                            }`}
                          >
                            <p className="text-xs font-medium mb-1">
                              {t.sender} • {t.date}
                            </p>
                            <p>{t.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
