import type { ApiErrorResponse } from "@/types/apiTypes";

function isApiErrorResponse(error: unknown): error is ApiErrorResponse {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "data" in error &&
    typeof (error as ApiErrorResponse).data === "object" &&
    "message" in (error as ApiErrorResponse).data
  );
}

export { isApiErrorResponse };
