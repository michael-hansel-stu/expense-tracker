import prisma from "@/lib/prisma";

export const dynamic = "force-static";

export async function GET() {
  const transactions = await prisma.transaction.findMany();
  return Response.json({ data: transactions });
}
