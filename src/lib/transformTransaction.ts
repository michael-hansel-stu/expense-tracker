import { TransactionApiResponse, TransactionType } from "@/types/Transaction";
import { Transaction as PrismaTransaction } from "@prisma/client";

export const transfromTransaction = (
  transaction: PrismaTransaction
): TransactionApiResponse => ({
  id: transaction.id,
  description: transaction.description,
  amount: transaction.amount,
  date: transaction.date.toISOString(),
  type: transaction.type as TransactionType,
  createdAt: transaction.createdAt.toISOString(),
});
