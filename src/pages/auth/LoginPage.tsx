import { useState } from "react"; // 👈 1. State import karein
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react"; // 👈 2. Icons import karein

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { setUser } from "@/store/slices/authSlice";
import { useLoginMutation } from "@/store/api/authApi";
import { useDispatch } from "react-redux";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  // 🔹 3. Password visibility state
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const res = await login(values).unwrap();
      dispatch(setUser(res.user));
      toast.success("Login Successful");
      navigate("/mlife");
    } catch (err) {
      const error = err as FetchBaseQueryError & {
        data?: { message?: string };
      };
      toast.error(error?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 border border-zinc-200 dark:border-zinc-800 p-8 rounded-[2rem] shadow-2xl bg-card">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
            <Lock size={24} />
          </div>
          <h1 className="text-4xl font-[1000] uppercase italic tracking-tighter">
            Login
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
            Enter your credentials to continue
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase ml-2 opacity-60">
                    Email *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="rahul@example.com"
                      className="h-12 rounded-xl border-2 font-bold"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold italic" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase ml-2 opacity-60">
                    Password *
                  </FormLabel>
                  <FormControl>
                    {/* 🔹 4. Eye Toggle Container */}
                    <div className="relative">
                      <Input
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        className="h-12 rounded-xl border-2 font-bold pr-12"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors p-1"
                      >
                        {showPassword ? (
                          <EyeOff size={18} strokeWidth={2.5} />
                        ) : (
                          <Eye size={18} strokeWidth={2.5} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold italic" />
                </FormItem>
              )}
            />

            <div className="flex justify-end mt-[-10px]">
              <Button
                variant="link"
                className="px-0 text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100"
                type="button"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </Button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 rounded-2xl bg-slate-950 dark:bg-primary text-white dark:text-black font-[1000] uppercase italic tracking-widest text-lg shadow-xl shadow-primary/20 transition-all active:scale-95"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-[10px] font-black uppercase tracking-widest opacity-40">
          Don't have an account?{" "}
          <Button
            variant="link"
            className="px-1 text-primary p-0 h-auto font-black uppercase underline decoration-2 underline-offset-4"
            type="button"
            onClick={() => navigate("/register")}
          >
            Sign up
          </Button>
        </p>
      </div>
    </div>
  );
}
