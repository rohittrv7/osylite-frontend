import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
  Loader2,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

// 🔹 Validation Schema (Zod)
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordFormValues) => {
    setIsLoading(true);
    // 🔹 API Logic yahan aayegi
    console.log("Password Data:", data);

    setTimeout(() => {
      setIsLoading(false);
      alert("Password updated successfully!");
      navigate(-1); // Wapas pichle page par bhej dega
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-10 space-y-6 animate-in fade-in duration-500">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="font-black uppercase italic text-xs gap-2"
      >
        <ArrowLeft size={16} /> Go Back
      </Button>

      <Card className="border-2 rounded-md shadow-2xl overflow-hidden border-border/50">
        <CardHeader className="bg-muted/20 border-b p-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <ShieldCheck size={28} />
            </div>
            <div>
              <CardTitle className="text-2xl font-black uppercase italic tracking-tighter">
                Security <span className="text-primary">Settings</span>
              </CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                Update your account password securely
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8 md:p-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Current Password */}
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase ml-2 opacity-60">
                      Current Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showCurrent ? "text" : "password"}
                          className="h-12 rounded-xl border-2 font-bold pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrent(!showCurrent)}
                          className="absolute right-3 top-3 text-muted-foreground"
                        >
                          {showCurrent ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-[10px] font-bold italic" />
                  </FormItem>
                )}
              />

              <Separator className="border-dashed" />

              {/* New Password */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase ml-2 opacity-60">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showNew ? "text" : "password"}
                            className="h-12 rounded-xl border-2 font-bold pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-3 top-3 text-muted-foreground"
                          >
                            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-[10px] font-bold italic" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase ml-2 opacity-60">
                        Confirm New Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="h-12 rounded-xl border-2 font-bold"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] font-bold italic" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-4">
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="w-full h-14 rounded-2xl font-black uppercase italic tracking-widest bg-primary text-primary-foreground shadow-xl shadow-primary/20 transition-all active:scale-95"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : (
                    <Save className="mr-2 w-5 h-5" />
                  )}
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
