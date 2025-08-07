"use client";

import useAdminUtilities from "@/api/utility/useAdminUtilities";
import UtilityDataTable from "@/components/admin/v2/UtilityDataTable";

const UtilitiesPage = () => {
  const { data: utilities, isLoading, error } = useAdminUtilities();

  if (error) {
    return (
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <div className="text-center text-red-600">
          <p>เกิดข้อผิดพลาดในการโหลดข้อมูลสาธารณูปโภค: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900">ข้อมูลสาธารณูปโภค</h1>
        <p className="text-gray-600 mt-1">
          จัดการข้อมูลสาธารณูปโภคทั้งหมดในระบบ
        </p>
      </div>

      {/* Data Table */}
      <UtilityDataTable data={utilities || []} isLoading={isLoading} />
    </div>
  );
};

export default UtilitiesPage;
