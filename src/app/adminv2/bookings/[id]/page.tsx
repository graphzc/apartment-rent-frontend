import { Suspense } from "react";
import BookingViewV2 from "../view/[id]/BookingViewV2";

interface BookingDetailPageProps {
  params: {
    id: string;
  };
}

const BookingDetailPage = ({ params }: BookingDetailPageProps) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <Suspense fallback={
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">กำลังโหลด...</span>
        </div>
      }>
        <BookingViewV2 id={params.id} />
      </Suspense>
    </div>
  );
};

export default BookingDetailPage;
