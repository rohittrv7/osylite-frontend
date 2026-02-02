import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CategorySelector } from "./CategorySelector";
import { CommonFields } from "./section/CommonFields";
import { MedicalFields } from "./section/MedicalFields";
import { EducationFields } from "./section/EducationFields";
import { TradeFields } from "./section/TradeFields";
import { FoodFields } from "./section/FoodFields";
import { BankFields } from "./section/BankFields";
import { CreatorFields } from "./section/CreatorFields";
import { DeliveryFields } from "./section/DeliveryFields";
import {
  AssociateCategory,
  CATEGORY_LABELS,
  MEDICAL_CATEGORIES,
  EDUCATION_CATEGORIES,
  TRADE_CATEGORIES,
  FOOD_CATEGORIES,
  BANK_CATEGORIES,
  CREATOR_CATEGORIES,
  DELIVERY_CATEGORIES,
} from "@/types/associate";
import { toast } from "sonner";
import { UserPlus, Loader2, CheckCircle2 } from "lucide-react";
import {
  associateFormSchema,
  type AssociateFormSchema,
} from "@/lib/validationSchema";
import { apiErrorToastHandler } from "@/helpers/apiErrorToastHandler";
import { useGetMyAssociateProfileQuery } from "@/store/api/associateApi";
import { useNavigate } from "react-router-dom";
import { useApplyAssociateMutation } from "@/store/api/authApi";

export function AssociateRegistrationForm() {
  const navigate = useNavigate();
  const [applyAssociate] = useApplyAssociateMutation();
  const {
    data: profile,
    isLoading: profileIsLoading,
    isSuccess,
  } = useGetMyAssociateProfileQuery();

  const form = useForm<AssociateFormSchema>({
    resolver: zodResolver(associateFormSchema),
    defaultValues: {
      category: "" as AssociateCategory,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "", // Present for validation UI only
      businessName: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      businessMobile: "",
      website: "",
    },
    mode: "onChange",
  });

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = form;
  const selectedCategory = watch("category");

  const onSubmit = async (data: AssociateFormSchema) => {
    try {
      // 1. Generate Unique Username
      // Example: rohitkumar + random numbers
      const baseName = `${data.firstName}${data.lastName}`
        .toLowerCase()
        .replace(/\s+/g, "");
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const uniqueUsername = `${baseName}${randomSuffix}`;

      // 2. Prepare Payload - Remove confirmPassword using destructuring
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword: _, ...restData } = data;

      const payload = {
        ...restData,
        username: uniqueUsername,
      };

      await applyAssociate(payload).unwrap();

      navigate("/verify-otp", {
        state: { email: data.email },
      });
      toast.success("Registration submitted successfully!");
    } catch (error) {
      apiErrorToastHandler(error);
    }
  };

  const showMedical =
    selectedCategory && MEDICAL_CATEGORIES.includes(selectedCategory);
  const showEducation =
    selectedCategory && EDUCATION_CATEGORIES.includes(selectedCategory);
  const showTrade =
    selectedCategory && TRADE_CATEGORIES.includes(selectedCategory);
  const showFood =
    selectedCategory && FOOD_CATEGORIES.includes(selectedCategory);
  const showBank =
    selectedCategory && BANK_CATEGORIES.includes(selectedCategory);
  const showCreator =
    selectedCategory && CREATOR_CATEGORIES.includes(selectedCategory);
  const showDelivery =
    selectedCategory && DELIVERY_CATEGORIES.includes(selectedCategory);

  if (profileIsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isSuccess && profile?.status === "pending") {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center p-6">
        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold">Application Pending</h2>
        <p className="text-muted-foreground mt-2">
          You have already applied. Please wait for admin approval.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center space-y-2">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <UserPlus className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Associate Registration
          </h1>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Fill in your details to become a registered associate partner with
            ANG
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Category Selection Card */}
          <Card className="border-2 border-dashed border-primary/20 bg-card shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                1. Choose Category
              </CardTitle>
              <CardDescription>
                Select the category that best describes your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CategorySelector
                value={selectedCategory}
                onChange={(v) =>
                  form.setValue("category", v, { shouldValidate: true })
                }
                error={errors.category}
              />
              {selectedCategory && (
                <div className="mt-4 flex justify-center animate-in fade-in zoom-in duration-300">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                    Selected: {CATEGORY_LABELS[selectedCategory]}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dynamic Form Sections */}
          {selectedCategory && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              {/* Common Fields (Personal + Business) */}
              <CommonFields form={form} />

              {/* Conditional Fields */}
              {showMedical && <MedicalFields form={form} />}
              {showEducation && <EducationFields form={form} />}
              {showTrade && <TradeFields form={form} />}
              {showFood && <FoodFields form={form} />}
              {showBank && <BankFields form={form} />}
              {showCreator && <CreatorFields form={form} />}
              {showDelivery && <DeliveryFields form={form} />}

              {/* Submit Button */}
              <div className="flex flex-col gap-4 pt-6 border-t mt-8">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full text-lg font-semibold shadow-lg transition-transform active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>Submit Application</>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  By clicking submit, you agree to our Terms and Conditions.
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
