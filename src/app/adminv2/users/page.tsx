"use client";

import useAdminUsers from "@/api/user/useAdminUsers";
import UserDataTable from "@/components/admin/v2/UserDataTable";

const UsersPage = () => {
  const { data: users, isLoading, error } = useAdminUsers();

  if (error) {
    return (
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <div className="text-center text-red-600">
          <p>เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ใช้: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900">จัดการผู้ใช้</h1>
        <p className="text-gray-600 mt-1">
          จัดการข้อมูลและบทบาทของผู้ใช้ทั้งหมดในระบบ
        </p>
      </div>

      {/* Data Table */}
      <UserDataTable data={users || []} isLoading={isLoading} />
    </div>
  );
};

export default UsersPage;
