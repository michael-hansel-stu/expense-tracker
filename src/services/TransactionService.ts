import { TransactionApiResponse } from "@/types/Transaction";
import axios from "axios";

export const fetchTransactions = async (): Promise<
  TransactionApiResponse[]
> => {
  try {
    const response = await axios.get<TransactionApiResponse[]>(
      "/api/transactions"
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
      throw new Error(
        `Failed to fetch transactions: ${
          error.response?.data || "Unknown error"
        }`
      );
    } else {
      console.error("Unexpected error", error);
      throw new Error(
        "An unexpected error occured while fetching transactions."
      );
    }
  }
};
