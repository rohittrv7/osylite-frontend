import { toast } from "sonner";
import { isApiErrorResponse } from "./isApiErrorResponse";

export const apiErrorToastHandler = (error: unknown) => {
  if (isApiErrorResponse(error)) {
    toast.error(error?.data?.message ?? "An unexpected error occurred");
  }
};
