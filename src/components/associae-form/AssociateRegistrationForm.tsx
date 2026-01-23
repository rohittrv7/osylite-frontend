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
import {
  useApplyAssociateMutation,
  useGetMyAssociateProfileQuery,
} from "@/store/api/associateApi";
import { useNavigate } from "react-router-dom";

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
      await applyAssociate(data).unwrap();
      navigate("/home");
      toast.success("Registration submitted successfully!");
    } catch (error) {
      apiErrorToastHandler(error);
    }
  };

  // Determine which category-specific fields to show
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
    return <div>Loading...</div>;
  }

  if (isSuccess && profile?.status === "pending") {
    return <div>You have already applied for associate.</div>;
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <UserPlus className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Associate Registration
          </h1>
          <p className="mt-2 text-muted-foreground">
            Fill in your details to become a registered associate partner
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Category Selection Card */}
          <Card className="border-2 border-dashed border-primary/20 bg-card shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Choose Your Category</CardTitle>
              <CardDescription>
                Select the category that best describes your business or
                profession
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
                <div className="mt-4 animate-fade-in">
                  <span className="category-badge">
                    {CATEGORY_LABELS[selectedCategory]}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dynamic Form Sections */}
          {selectedCategory && (
            <div className="space-y-6 animate-slide-up">
              {/* Common Fields - Always shown */}
              <CommonFields form={form} />

              {/* Category-specific fields */}
              {showMedical && <MedicalFields form={form} />}
              {showEducation && <EducationFields form={form} />}
              {showTrade && <TradeFields form={form} />}
              {showFood && <FoodFields form={form} />}
              {showBank && <BankFields form={form} />}
              {showCreator && <CreatorFields form={form} />}
              {showDelivery && <DeliveryFields form={form} />}

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="min-w-[200px] bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Submit Registration
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
