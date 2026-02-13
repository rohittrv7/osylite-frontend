import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader2, Save, User as UserIcon, Lock } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { useLazyGetUploadSignatureQuery } from "@/store/api/cloudinaryApi";

import * as z from "zod";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/store/api/authApi";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  bio: z.string().max(300, "Bio must be under 300 characters").optional(),
  pincode: z.string().length(6, "Pincode must be 6 digits"),
  avatarUrl: z.string().url().optional(),
  privacySettings: z.object({
    isProfilePublic: z.boolean(),
    isPhotoPublic: z.boolean(),
    isFriendsListPublic: z.boolean(),
    showJobProfile: z.boolean(),
    showMarriageProfile: z.boolean(),
  }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export default function EditProfile() {
  const { data: user, isLoading: isUserLoading } = useGetProfileQuery();
  const [updateMe, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [getSignatureTrigger] = useLazyGetUploadSignatureQuery();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      bio: user?.bio || "",
      pincode: user?.pincode || "",
      avatarUrl: user?.avatarUrl || "",
      privacySettings: user?.privacySettings || {
        isProfilePublic: true,
        isPhotoPublic: true,
        isFriendsListPublic: true,
        showJobProfile: false,
        showMarriageProfile: false,
      },
    },
  });

  const getSignature = async ({ folder }: { folder: string }) => {
    return await getSignatureTrigger({ folder }).unwrap();
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const res = await uploadToCloudinary({
        file,
        postType: "post", // Folder logic in your helper
        getSignature,
        onProgress: () => {},
      });
      form.setValue("avatarUrl", res.secure_url);
      toast.success("Avatar uploaded! Save changes to apply.");
    } catch (err) {
      apiErrorToastHandler(err);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      await updateMe(values).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err) {
      apiErrorToastHandler(err);
    }
  };

  if (isUserLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="container p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Edit Profile
              </h1>
              <p className="text-muted-foreground">
                Manage your account settings and privacy.
              </p>
            </div>
            <Button type="submit" disabled={isUpdating || uploading}>
              {isUpdating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Changes
            </Button>
          </div>

          {/* AVATAR SECTION */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4">
                <div
                  className="relative group cursor-pointer"
                  onClick={handleAvatarClick}
                >
                  <div className="w-32 h-32 rounded-full border-4 border-background overflow-hidden bg-muted flex items-center justify-center">
                    {form.watch("avatarUrl") ? (
                      <img
                        src={form.watch("avatarUrl")}
                        className="w-full h-full object-cover"
                        alt="Avatar"
                      />
                    ) : (
                      <UserIcon className="w-16 h-16 text-muted-foreground" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {uploading ? (
                      <Loader2 className="text-white animate-spin" />
                    ) : (
                      <Camera className="text-white w-8 h-8" />
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-medium">Profile Picture</h3>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG or WebP. Max 2MB.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PERSONAL INFO */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
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
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Email Address</Label>
                  <Input value={user?.email} disabled className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Phone Number</Label>
                  <Input
                    value={user?.phoneNumber}
                    disabled
                    className="bg-muted/50"
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself..."
                        className="resize-none h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value?.length || 0}/300 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pincode</FormLabel>
                    <FormControl>
                      <Input placeholder="800001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* PRIVACY SETTINGS */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                <CardTitle>Privacy Settings</CardTitle>
              </div>
              <CardDescription>
                Control who can see your information and profile activity.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  key: "isProfilePublic",
                  label: "Public Profile",
                  desc: "Allow anyone to find and view your profile.",
                },
                {
                  key: "isPhotoPublic",
                  label: "Show Profile Photo",
                  desc: "Make your photo visible to everyone.",
                },
                {
                  key: "isFriendsListPublic",
                  label: "Show Friends List",
                  desc: "Allow users to see who you follow.",
                },
                {
                  key: "showJobProfile",
                  label: "Show Job Profile",
                  desc: "Display your professional details on your main profile.",
                },
                {
                  key: "showMarriageProfile",
                  label: "Show Matrimony Badge",
                  desc: "Show your interest in matrimony services.",
                },
              ].map((setting) => (
                <FormField
                  key={setting.key}
                  control={form.control}
                  name={`privacySettings.${setting.key as keyof ProfileFormValues["privacySettings"]}`}
                  render={({ field }) => (
                    <div className="flex items-center justify-between space-x-2 border-b pb-4 last:border-0 last:pb-0">
                      <div className="space-y-0.5">
                        <Label className="text-base">{setting.label}</Label>
                        <p className="text-sm text-muted-foreground">
                          {setting.desc}
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                  )}
                />
              ))}
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
