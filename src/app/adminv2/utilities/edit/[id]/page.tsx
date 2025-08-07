"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import UtilityForm from "@/components/admin/v2/UtilityForm";
import useAdminUtility from "@/api/utility/useAdminUtility";
import useUpdateAdminUtility from "@/api/utility/useUpdateAdminUtility";
import { UpdateUtilityRequest } from "@/interface/requests/UtilityRequest";

const EditUtilityPage = () => {
  const router = useRouter();
  const params = useParams();
  const utilityId = params.id as string;

  const {
    data: utility,
    isLoading: isLoadingUtility,
    error,
  } = useAdminUtility(utilityId);
  const updateUtility = useUpdateAdminUtility();

  useEffect(() => {
    if (error) {
      console.error("Failed to load utility:", error);
      router.push("/adminv2/utilities");
    }
  }, [error, router]);

  const handleSubmit = async (data: UpdateUtilityRequest) => {
    try {
      await updateUtility.mutateAsync({ id: utilityId, data });
      router.push("/adminv2/utilities");
    } catch (error) {
      // Error handling is done in the hook
      console.error("Failed to update utility:", error);
    }
  };

  const handleCancel = () => {
    router.push("/adminv2/utilities");
  };

  // Loading state
  if (isLoadingUtility) {
    return (
      <div className="space-y-6">
        {/* Header with loading */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>

        {/* Form loading */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
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
            <p>เกิดข้อผิดพลาดในการโหลดข้อมูลสาธารณูปโภค: {error.message}</p>
            <button
              onClick={() => router.push("/adminv2/utilities")}
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
        <h1 className="text-2xl font-bold text-gray-900">
          แก้ไขข้อมูลสาธารณูปโภค
        </h1>
        <p className="text-gray-600 mt-1">
          แก้ไขข้อมูลการใช้สาธารณูปโภคสำหรับ Booking ID: {utility?.bookingId}
        </p>
      </div>

      {/* Form */}
      <UtilityForm
        mode="edit"
        utility={utility}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={updateUtility.isPending}
      />
    </div>
  );
};

export default EditUtilityPage;
