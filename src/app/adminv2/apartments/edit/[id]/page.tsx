"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import useApartmentV2 from "@/api/apartment/useApartmentV2";
import useUpdateApartmentV2 from "@/api/apartment/useUpdateApartmentV2";
import ApartmentForm from "@/components/admin/v2/ApartmentForm";
import { UpdateApartmentRequest } from "@/interface/requests/ApartmentV2Request";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const EditApartmentPage = () => {
  const router = useRouter();
  const params = useParams();
  const apartmentId = params.id as string;

  const {
    data: apartment,
    isLoading: isLoadingApartment,
    error,
  } = useApartmentV2(apartmentId);
  const updateApartment = useUpdateApartmentV2();

  // Redirect to apartments list if apartment ID is invalid
  useEffect(() => {
    if (!apartmentId) {
      router.push("/adminv2/apartments");
    }
  }, [apartmentId, router]);

  const handleSubmit = async (data: UpdateApartmentRequest) => {
    try {
      await updateApartment.mutateAsync({ id: apartmentId, data });
      router.push("/adminv2/apartments");
    } catch (error) {
      // Error handling is done in the hook
      console.error("Failed to update apartment:", error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleViewApartment = () => {
    router.push(`/adminv2/apartments/view/${apartmentId}`);
  };

  // Loading state
  if (isLoadingApartment) {
    return (
      <div className="space-y-6">
        {/* Header with loading */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push("/adminv2/apartments")}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                แก้ไขอพาร์ตเมนต์
              </h1>
              <p className="text-gray-600">กำลังโหลดข้อมูลอพาร์ตเมนต์...</p>
            </div>
          </div>
        </div>

        {/* Loading content */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">
              กำลังโหลดข้อมูลอพาร์ตเมนต์...
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        {/* Header with error */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push("/adminv2/apartments")}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                แก้ไขอพาร์ตเมนต์
              </h1>
              <p className="text-gray-600">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
            </div>
          </div>
        </div>

        {/* Error content */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              เกิดข้อผิดพลาด
            </h3>
            <p className="text-gray-600 mb-4">
              ไม่สามารถโหลดข้อมูลอพาร์ตเมนต์ได้: {error.message}
            </p>
            <div className="space-x-3">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                ลองใหม่
              </button>
              <button
                onClick={() => router.push("/adminv2/apartments")}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                กลับไปหน้ารายการ
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No apartment found
  if (!apartment) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push("/adminv2/apartments")}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                แก้ไขอพาร์ตเมนต์
              </h1>
              <p className="text-gray-600">ไม่พบข้อมูลอพาร์ตเมนต์</p>
            </div>
          </div>
        </div>

        {/* Not found content */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              ไม่พบข้อมูลอพาร์ตเมนต์
            </h3>
            <p className="text-gray-600 mb-4">
              ไม่พบอพาร์ตเมนต์ที่มี ID: {apartmentId}
            </p>
            <button
              onClick={() => router.push("/adminv2/apartments")}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              กลับไปหน้ารายการ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success state - render the edit form
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push("/adminv2/apartments")}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              title="กลับไปหน้ารายการ"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                แก้ไขอพาร์ตเมนต์
              </h1>
              <p className="text-gray-600">
                อัปเดตข้อมูลอพาร์ตเมนต์: {apartment.name}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex space-x-2">
            <button
              onClick={handleViewApartment}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              ดูรายละเอียด
            </button>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <ApartmentForm
        apartment={apartment}
        mode="edit"
        onSubmit={handleSubmit}
        isLoading={updateApartment.isPending}
      />

      {/* Additional Information */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          ข้อมูลเพิ่มเติม
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">รหัสอพาร์ตเมนต์:</span>
            <span className="ml-2 font-mono text-gray-900">{apartment.id}</span>
          </div>
          <div>
            <span className="text-gray-500">วันที่สร้าง:</span>
            <span className="ml-2 text-gray-900">
              {new Intl.DateTimeFormat("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(apartment.createdAt))}
            </span>
          </div>
          <div>
            <span className="text-gray-500">แก้ไขล่าสุด:</span>
            <span className="ml-2 text-gray-900">
              {new Intl.DateTimeFormat("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(apartment.updatedAt))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditApartmentPage;
