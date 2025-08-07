"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import UserForm from "@/components/admin/v2/UserForm";
import useAdminUser from "@/api/user/useAdminUser";
import useUpdateAdminUser from "@/api/user/useUpdateAdminUser";
import { AdminUpdateUserRequest } from "@/interface/requests/AdminUserRequest";

const EditUserPage = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const { data: user, isLoading: isLoadingUser, error } = useAdminUser(userId);
  const updateUser = useUpdateAdminUser();

  useEffect(() => {
    if (error) {
      console.error("Failed to load user:", error);
      router.push("/adminv2/users");
    }
  }, [error, router]);

  const handleSubmit = async (data: AdminUpdateUserRequest) => {
    try {
      await updateUser.mutateAsync({ id: userId, data });
      router.push("/adminv2/users");
    } catch (error) {
      // Error handling is done in the hook
      console.error("Failed to update user:", error);
    }
  };

  const handleCancel = () => {
    router.push("/adminv2/users");
  };

  const handleViewUser = () => {
    router.push(`/adminv2/users/view/${userId}`);
  };

  // Loading state
  if (isLoadingUser) {
    return (
      <div className="space-y-6">
        {/* Header with loading */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="text-center text-red-600">
            <p>เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ใช้: {error.message}</p>
            <button
              onClick={() => router.push("/adminv2/users")}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              กลับไปหน้ารายการ
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="text-center text-gray-500">
            <p>ไม่พบข้อมูลผู้ใช้</p>
            <button
              onClick={() => router.push("/adminv2/users")}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              กลับไปหน้ารายการ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              แก้ไขข้อมูลผู้ใช้
            </h1>
            <p className="text-gray-600 mt-1">
              อัปเดตข้อมูลส่วนตัวและบทบาทของ {user.name}
            </p>
          </div>
          <button
            onClick={handleViewUser}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            ดูข้อมูล
          </button>
        </div>
      </div>

      {/* Form */}
      <UserForm
        mode="edit"
        user={user}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={updateUser.isPending}
      />
    </div>
  );
};

export default EditUserPage;
