import ModulePage from "@/components/ModulePage";
import { MessageSquare, Star, FileText, BarChart3, ThumbsUp } from "lucide-react";

const subModules = [
  { icon: MessageSquare, label: "New Feedback", iconColor: "#0891b2", iconBg: "#e0f7fa" },
  { icon: Star, label: "Ratings", iconColor: "#d97706", iconBg: "#fef3c7" },
  { icon: ThumbsUp, label: "Patient Satisfaction", iconColor: "#059669", iconBg: "#d1fae5" },
  { icon: BarChart3, label: "Feedback Analytics", iconColor: "#7c3aed", iconBg: "#ede9fe" },
  { icon: FileText, label: "Feedback Reports", iconColor: "#6366f1", iconBg: "#e0e7ff" },
];

const FeedBack = () => <ModulePage title="Feed Back" subModules={subModules} />;
export default FeedBack;
