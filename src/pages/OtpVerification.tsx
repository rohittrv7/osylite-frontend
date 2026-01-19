import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { setUser } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import {
  useOtpVerifyMutation,
  useResendOtpMutation,
} from "@/store/api/authApi";

export default function OTPVerificationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verifyOtp] = useOtpVerifyMutation();
  const [resendOtp] = useResendOtpMutation();
  const location = useLocation();

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { email } = location.state || { email: "Your Email" };

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value)) && value !== "") return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d{1,6}$/.test(pastedData)) return;

    const digits = pastedData.split("").slice(0, 6);
    const newOtp = [...otp];
    digits.forEach((digit, i) => {
      if (index + i < 6) newOtp[index + i] = digit;
    });
    setOtp(newOtp);

    const nextFocus = Math.min(index + digits.length, 5);
    inputRefs.current[nextFocus]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsVerifying(true);

    try {
      const res = await verifyOtp({ otp: otpValue }).unwrap();

      dispatch(setUser(res.user));

      toast.success("OTP Verified Successfully!");
      navigate("/mlife");
    } catch {
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    try {
      const res = await resendOtp().unwrap();
      toast.success(res.message);
      navigate("/mlife");
    } catch {
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Verify Your Email
          </CardTitle>
          <CardDescription>
            We sent a 6-digit code to your email
            <br />
            <span className="font-medium text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={(e) => handlePaste(e, index)}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  className="text-center text-2xl font-bold h-14 w-14"
                  autoComplete="one-time-code"
                  inputMode="numeric"
                />
              ))}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={otp.join("").length !== 6 || isVerifying}
            >
              {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isVerifying ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={resendTimer > 0}
                className={`font-medium ${
                  resendTimer > 0
                    ? "text-muted-foreground cursor-not-allowed"
                    : "text-primary hover:underline"
                }`}
              >
                Resend {resendTimer > 0 ? `(${resendTimer}s)` : ""}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
