import TransactionList from "@/components/home/TransactionList";
import { Suspense } from "react";

const page = async () => {
  return (
    <div className="max-w-screen-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Transaction List</h1>

      <Suspense fallback={<Loading />}>
        <TransactionList />
      </Suspense>
    </div>
  );
};

function Loading() {
  return <div>Loading transactions...</div>;
}

export default page;
