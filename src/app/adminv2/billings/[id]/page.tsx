import { Suspense } from "react";
import BillingViewV2 from "./BillingViewV2";

interface BillingViewPageProps {
  params: {
    id: string;
  };
}

const BillingViewPage = ({ params }: BillingViewPageProps) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <Suspense fallback={
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">กำลังโหลด...</span>
        </div>
      }>
        <BillingViewV2 id={params.id} />
      </Suspense>
    </div>
  );
};

export default BillingViewPage;
