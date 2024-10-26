import prisma from "@/lib/prisma";
import { TransactionApiResponse } from "@/types/Transaction";

export async function GET(): Promise<Response> {
  try {
    const transactions: TransactionApiResponse[] =
      await prisma.transaction.findMany();
    return new Response(JSON.stringify(transactions), {
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
