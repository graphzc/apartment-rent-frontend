import { Suspense } from "react";
import ReceiptView from "./ReceiptView";

interface ReceiptPageProps {
  params: {
    id: string;
  };
}

const ReceiptPage = ({ params }: ReceiptPageProps) => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Suspense fallback={
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">กำลังโหลด...</span>
        </div>
      }>
        <ReceiptView id={params.id} />
      </Suspense>
    </div>
  );
};

export default ReceiptPage;
