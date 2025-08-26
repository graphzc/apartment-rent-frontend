"use client";

import { useRouter } from "next/navigation";
import useAdminUsers from "@/api/user/useAdminUsers";
import UserDataTable from "@/components/admin/v2/UserDataTable";
import { UserPlusIcon } from "@heroicons/react/24/outline";

const UsersPage = () => {
  const router = useRouter();
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">จัดการผู้ใช้</h1>
            <p className="text-gray-600 mt-1">
              จัดการข้อมูลและบทบาทของผู้ใช้ทั้งหมดในระบบ
            </p>
          </div>
          <button
            onClick={() => router.push("/adminv2/users/create")}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <UserPlusIcon className="h-5 w-5 mr-2" />
            สร้างผู้ใช้ใหม่
          </button>
        </div>
      </div>

      {/* Data Table */}
      <UserDataTable data={users || []} isLoading={isLoading} />
    </div>
  );
};

export default UsersPage;
