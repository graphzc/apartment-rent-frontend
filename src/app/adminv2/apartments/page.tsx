"use client";

import useApartmentsV2 from "@/api/apartment/useApartmentsV2";
import ApartmentDataTableV2 from "@/components/admin/v2/ApartmentDataTableV2";

const ApartmentsPage = () => {
  const { data: apartments, isLoading, error } = useApartmentsV2();

  if (error) {
    return (
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <div className="text-center text-red-600">
          <p>เกิดข้อผิดพลาดในการโหลดข้อมูลอพาร์ตเมนต์: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900">อพาร์ตเมนต์</h1>
        <p className="text-gray-600 mt-1">จัดการอพาร์ตเมนต์ทั้งหมดในระบบ</p>
      </div>

      {/* Data Table */}
      <ApartmentDataTableV2 data={apartments || []} isLoading={isLoading} />
    </div>
  );
};

export default ApartmentsPage;
