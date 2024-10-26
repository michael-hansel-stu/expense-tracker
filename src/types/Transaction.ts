export type Transaction = {
  id: number;
  description: string;
  amount: string;
  date: string;
  type: string;
};

export type TransactionApiResponse = {
  id: number;
  description: string;
  amount: number;
  date: Date;
  type: string;
  userId: number;
  createdAt: Date;
};
