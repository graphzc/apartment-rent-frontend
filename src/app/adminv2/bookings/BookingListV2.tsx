"use client";

import useBookingsV2 from "@/api/booking/useBookingsV2";
import BookingDataTableV2 from "@/components/admin/v2/BookingDataTableV2";

const BookingListV2 = () => {
  const { data: bookings = [], isLoading, error } = useBookingsV2();

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-red-600 text-center">
          <p className="text-lg font-semibold">เกิดข้อผิดพลาด</p>
          <p className="text-sm mt-2">ไม่สามารถโหลดข้อมูลการจองได้ กรุณาลองใหม่อีกครั้ง</p>
        </div>
      </div>
    );
  }

  return <BookingDataTableV2 data={bookings} isLoading={isLoading} />;
};

export default BookingListV2;
