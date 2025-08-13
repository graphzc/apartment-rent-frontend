import { Suspense } from "react";
import ContractView from "./ContractView";

interface ContractPageProps {
  params: {
    id: string;
  };
}

const ContractPage = ({ params }: ContractPageProps) => {
  return (
    <div className="mx-auto px-4 py-6">


      <Suspense
        fallback={
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">กำลังโหลด...</span>
          </div>
        }
      >
        <ContractView id={params.id} />
      </Suspense>
    </div>
  );
};

export default ContractPage;
