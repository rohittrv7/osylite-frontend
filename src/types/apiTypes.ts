export interface ApiResT<T = unknown> {
  success: boolean;
  data: T;
  message: string;
}
export type ApiErrorResponse = {
  status: number;
  data: {
    success: boolean;
    data: null;
    message: string;
  };
};
