import { Suspense } from "react";
import NewsEditV2 from "./NewsEditV2";

interface EditNewsPageProps {
  params: {
    id: string;
  };
}

const EditNewsPage = ({ params }: EditNewsPageProps) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">แก้ไขข่าวสาร</h1>
        <p className="text-gray-600 mt-1">แก้ไขข้อมูลข่าวสาร</p>
      </div>

      <Suspense
        fallback={
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">กำลังโหลด...</span>
          </div>
        }
      >
        <NewsEditV2 id={params.id} />
      </Suspense>
    </div>
  );
};

export default EditNewsPage;
