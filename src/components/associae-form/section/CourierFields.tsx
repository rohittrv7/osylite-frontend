import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { AssociateFormSchema } from "@/lib/validationSchema";

export function CourierFields({
  form,
}: {
  form: UseFormReturn<AssociateFormSchema>;
}) {
  return (
    <Card className="border-primary/20 shadow-sm animate-in slide-in-from-left-4 duration-500">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Truck className="h-5 w-5 text-primary" />
          Courier/Post Office Details
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="officeEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Office Email</FormLabel>
              <FormControl>
                <Input placeholder="office@postal.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workingDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Working Days</FormLabel>
              <FormControl>
                <Input placeholder="Mon-Sat" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taluk"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Taluk</FormLabel>
              <FormControl>
                <Input placeholder="Enter Taluk" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <FormControl>
                <Input placeholder="Enter Region" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="division"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Division</FormLabel>
              <FormControl>
                <Input placeholder="Enter Division" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hoName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HO Name (Head Office)</FormLabel>
              <FormControl>
                <Input placeholder="Enter HO Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subDivision"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub Division</FormLabel>
              <FormControl>
                <Input placeholder="Enter Sub Division" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="validFrom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valid From Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
