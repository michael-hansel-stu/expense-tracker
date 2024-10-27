import prisma from "@/lib/prisma";
import { transfromTransaction } from "@/lib/transformTransaction";
import { TransactionApiResponse } from "@/types/Transaction";

export async function GET(): Promise<Response> {
  try {
    const transactions = await prisma.transaction.findMany();
    const transformedTransactions: TransactionApiResponse[] =
      transactions.map(transfromTransaction);
    return new Response(JSON.stringify(transformedTransactions), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error fetching transactions: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch transactions" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const res = await request.json();
    const transaction = await prisma.transaction.create({
      data: res,
    });
    const transformedTransaction: TransactionApiResponse =
      transfromTransaction(transaction);
    return new Response(JSON.stringify(transformedTransaction), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error creating transactions: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to create transactions" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}