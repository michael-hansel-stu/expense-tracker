import axios from "axios";
import {
  TransactionApiResponse,
  TransactionFormValues,
  ITransactionService,
  TransactionApiRequest,
} from "@/types/Transaction";

const handleAxiosError = (error: unknown, defaultMessage: string): never => {
  if (axios.isAxiosError(error)) {
    console.error("Axios error:", error.response?.data);
    throw new Error(
      `${defaultMessage}: ${error.response?.data || "Unknown error"}`
    );
  } else {
    console.error("Unknown error", error);
    throw new Error(`An unexpected error occurred: ${defaultMessage}`);
  }
};

export class TransactionService implements ITransactionService {
  private baseURL =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3000/api/transactions";

  async fetchTransactions(): Promise<TransactionApiResponse[]> {
    try {
      const response = await axios.get(`${this.baseURL}`);
      return response.data;
    } catch (error: unknown) {
      handleAxiosError(error, "Failed to fetch transaction");
      return undefined as unknown as TransactionApiResponse[];
    }
  }

  async fetchTransactionById(id: number): Promise<TransactionApiResponse> {
    try {
      const response = await axios.get<TransactionApiResponse>(
        `${this.baseURL}/${id}`
      );
      return response.data;
    } catch (error: unknown) {
      handleAxiosError(error, "Failed to fetch transaction");
      return undefined as unknown as TransactionApiResponse;
    }
  }

  async addTransaction(
    formData: TransactionFormValues
  ): Promise<TransactionApiResponse> {
    try {
      const normalizedData = this.normalizeData(formData);
      const response = await axios.post<TransactionApiResponse>(
        this.baseURL,
        normalizedData
      );

      console.log(response.data);
      return response.data;
    } catch (error: unknown) {
      handleAxiosError(error, "Failed to add transaction");
      return undefined as unknown as TransactionApiResponse;
    }
  }

  async updateTransaction(
    formData: TransactionFormValues
  ): Promise<TransactionApiResponse> {
    try {
      if (!formData.id) {
        throw new Error("Transaction ID is required for updating.");
      }

      const normalizeData = this.normalizeData(formData);
      const response = await axios.put<TransactionApiResponse>(
        `${this.baseURL}/${formData.id}`,
        normalizeData
      );

      return response.data;
    } catch (error: unknown) {
      handleAxiosError(error, "Failed to update transaction");
      return undefined as unknown as TransactionApiResponse;
    }
  }

  async deleteTransactionById(id: number): Promise<TransactionApiResponse> {
    try {
      const response = await axios.delete<TransactionApiResponse>(
        `${this.baseURL}/${id}`
      );
      return response.data;
    } catch (error: unknown) {
      handleAxiosError(error, "Failed to delete transaction");
      return undefined as unknown as TransactionApiResponse;
    }
  }

  private normalizeData(
    formData: TransactionFormValues
  ): Omit<TransactionApiRequest, "createdAt" | "id"> {
    return {
      description: formData.description,
      amount: Number(formData.amount),
      date: new Date(formData.date),
      type: formData.type,
    };
  }
}
