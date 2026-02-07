import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useForgotPasswordMutation } from "@/store/api/authApi";
import { setUser } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await forgotPassword({ email }).unwrap();
      toast.success(res.message || "Reset link sent on your email");
      dispatch(setUser(res.user));

      navigate("/reset-password", {
        state: { email },
      });
    } catch (err) {
      const error = err as FetchBaseQueryError & {
        data?: { message?: string };
      };
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <Link to="/login">
              <Button variant="ghost" size="icon" className="-ml-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <CardTitle className="text-2xl font-bold">
              Forgot Password ?
            </CardTitle>
          </div>
          <CardDescription>Enter Email for reset password</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Reset Password
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            login with password?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline cursor-pointer"
            >
              Login
            </Link>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-center justify-center text-xs text-muted-foreground pt-2 border-t">
          <p>Link valid till 15 minute</p>
          <p>Check your spam folder</p>
        </CardFooter>
      </Card>
    </div>
  );
}
