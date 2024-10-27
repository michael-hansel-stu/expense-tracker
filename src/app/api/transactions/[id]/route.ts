import prisma from "@/lib/prisma";
import { transfromTransaction } from "@/lib/transformTransaction";
import {
  TransactionApiRequest,
  TransactionApiResponse,
} from "@/types/Transaction";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const transactionId = Number((await params).id);

    if (isNaN(transactionId)) {
      return new Response(JSON.stringify({ error: "Invalid transaction ID" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });

    if (!transaction) {
      return new Response(JSON.stringify({ error: "Transaction not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const transformedTransaction: TransactionApiResponse =
      transfromTransaction(transaction);

    return new Response(JSON.stringify(transformedTransaction), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error fetching transaction: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch transaction" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
// PUT handler for updating a transaction by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    const transactionId = Number(params.id);

    // Validate if the ID is a valid number
    if (isNaN(transactionId)) {
      return new Response(JSON.stringify({ error: "Invalid transaction ID" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Parse request body to get the updated fields
    const requestBody: Omit<TransactionApiRequest, "createAt" | "id"> =
      await request.json();

    // Check if the transaction exists
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!existingTransaction) {
      return new Response(JSON.stringify({ error: "Transaction not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Update the transaction with the provided data
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: requestBody,
    });

    // Transform and return the updated transaction
    const transformedTransaction: TransactionApiResponse =
      transfromTransaction(updatedTransaction);

    return new Response(JSON.stringify(transformedTransaction), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error updating transaction: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to update transaction" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const transactionId = Number((await params).id);

    // Validate if the ID is a valid number
    if (isNaN(transactionId)) {
      return new Response(JSON.stringify({ error: "Invalid transaction ID" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const transaction = await prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });

    if (!transaction) {
      return new Response(
        JSON.stringify({ error: "Failed to delete transaction" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(JSON.stringify(transaction), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error deleting transaction: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to deleting transaction" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
