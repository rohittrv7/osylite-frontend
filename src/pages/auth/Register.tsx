import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRegisterMutation } from "@/store/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const formSchema = z
  .object({
    firstName: z.string().min(2, "First name required"),
    lastName: z.string().min(2, "Last name required"),
    mobile: z.string().min(10, "Valid mobile number required"),
    pincode: z.string().length(6, "Pincode must be 6 digits"),
    email: z.string().email("Invalid email"),
    username: z.string().min(3, "Username min 3 characters"),
    password: z.string().min(6, "Password min 6 characters"),
    confirmPassword: z.string(),
    // terms: z.boolean().refine((val) => val === true, {
    //   message: "You must agree to terms",
    // }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      pincode: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      // terms: false,
    },
  });

  async function onSubmit(values: FormValues) {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.mobile,
      pincode: values.pincode,
      email: values.email,
      username: values.username,
      password: values.password,
    };
    try {
      const res = await register(payload).unwrap();
      dispatch(setUser(res.user));
      toast.success(res.message);
      navigate("/verify-otp", {
        state: { email: values.email },
      });
    } catch (err) {
      const error = err as FetchBaseQueryError & {
        data?: { message?: string };
      };
      toast.error(
        error?.data?.message || "Registration failed. Please try again.",
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md border border-zinc-500 p-6 sm:p-8 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-muted-foreground mt-2">
            Enter your details to get started
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Mobile + Pincode */}
            <div className="">
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile *</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        {/* Country Code */}
                        <Select defaultValue="+91">
                          <SelectTrigger className="w-[72px] flex-shrink-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+91">+91 🇮🇳</SelectItem>
                          </SelectContent>
                        </Select>

                        {/* Mobile Number */}
                        <Input
                          type="tel"
                          placeholder="9964525434"
                          className="flex-1"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password *</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password *</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Terms */}
            {/* <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm leading-snug">
                    I agree to the{" "}
                    <span className="text-primary">Terms & Conditions</span> and{" "}
                    <span className="text-primary">Privacy Policy</span>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
          <p className="text-center text-sm mt-2 text-muted-foreground">
            Don't have an account?{" "}
            <Button
              variant="link"
              className="px-1 cursor-pointer"
              type="button"
              onClick={() => navigate("/login")}
            >
              Sign in
            </Button>
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Want to becaome Seller?{" "}
            <Button
              variant="link"
              className="px-1 cursor-pointer text-blue-400"
              type="button"
              onClick={() => navigate("/associate-register")}
            >
              Seller
            </Button>
          </p>
        </Form>
      </div>
    </div>
  );
}
