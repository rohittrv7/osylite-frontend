import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useResetPasswordMutation } from "@/store/api/authApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// ──────────────────────────────────────────────
// Validation Schema
// ──────────────────────────────────────────────

const formSchema = z
  .object({
    otp: z.string().length(6, "OTP must be 6 digits"),
    newPassword: z
      .string()
      .min(8)
      .regex(/[A-Z]/, "One uppercase letter required")
      .regex(/[0-9]/, "One number required"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormValues = z.infer<typeof formSchema>;

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Email passed from forgot-password page
  const email = location.state?.email;

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      await resetPassword({
        otp: values.otp,
        newPassword: values.newPassword,
      }).unwrap();

      toast.success("Password successfully reset 🎉");
      navigate("/login", { replace: true });
    } catch (err) {
      const error = err as FetchBaseQueryError & {
        data?: { message?: string };
      };
      toast.error(error?.data?.message || "Invalid OTP or expired");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/40 dark:bg-slate-950/40 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>
            OTP email par bheja gaya hai <br />
            <span className="font-medium">{email}</span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* OTP */}
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123456"
                        maxLength={6}
                        inputMode="numeric"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* New Password */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Reset Password
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="text-xs text-muted-foreground text-center">
          OTP 10–15 minutes ke liye valid hota hai
        </CardFooter>
      </Card>
    </div>
  );
}
