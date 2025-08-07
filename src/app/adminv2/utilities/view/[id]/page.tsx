"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import useAdminUtility from "@/api/utility/useAdminUtility";
import {
  PencilIcon,
  ArrowLeftIcon,
  CalendarIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const ViewUtilityPage = () => {
  const router = useRouter();
  const params = useParams();
  const utilityId = params.id as string;

  const { data: utility, isLoading, error } = useAdminUtility(utilityId);

  useEffect(() => {
    if (error) {
      console.error("Failed to load utility:", error);
      router.push("/adminv2/utilities");
    }
  }, [error, router]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };

  const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const formatUsage = (usage: number, unit: string) => {
    return `${usage} ${unit}`;
  };

  const handleEdit = () => {
    router.push(`/adminv2/utilities/edit/${utilityId}`);
  };

  const handleBack = () => {
    router.push("/adminv2/utilities");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-200 rounded w-2/3"></div>
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
            <p>เกิดข้อผิดพลาดในการโหลดข้อมูลสาธารณูปโภค: {error.message}</p>
            <button
              onClick={handleBack}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              กลับไปหน้ารายการ
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!utility) {
    return (
      <div className="space-y-6">
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="text-center text-gray-500">
            <p>ไม่พบข้อมูลสาธารณูปโภค</p>
            <button
              onClick={handleBack}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              กลับไปหน้ารายการ
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalCharge = utility.plumbingCharge + utility.electricityCharge;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleBack}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
              title="กลับ"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                ข้อมูลสาธารณูปโภค
              </h1>
              <p className="text-gray-600 mt-1">
                รายละเอียดการใช้สาธารณูปโภค ID: {utility.id}
              </p>
            </div>
          </div>
          <button
            onClick={handleEdit}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            แก้ไข
          </button>
        </div>
      </div>

      {/* Utility Details */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">รายละเอียด</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Booking Information */}
            <div className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <DocumentTextIcon className="h-4 w-4 mr-1" />
                  Booking ID
                </dt>
                <dd className="mt-1 text-sm text-gray-900 font-mono">
                  {utility.bookingId}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <DocumentTextIcon className="h-4 w-4 mr-1" />
                  Billing ID
                </dt>
                <dd className="mt-1 text-sm text-gray-900 font-mono">
                  {utility.billingId}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  วันที่สร้าง
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formatDate(utility.createdAt)}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  วันที่อัปเดต
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formatDate(utility.updatedAt)}
                </dd>
              </div>
            </div>

            {/* Usage Information */}
            <div className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">การใช้น้ำ</dt>
                <dd className="mt-1 text-lg font-semibold text-blue-600">
                  {formatUsage(utility.plumbingUsage, "หน่วย")}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">การใช้ไฟ</dt>
                <dd className="mt-1 text-lg font-semibold text-orange-600">
                  {formatUsage(utility.electricityUsage, "หน่วย")}
                </dd>
              </div>

              {utility.paidAt && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    วันที่ชำระ
                  </dt>
                  <dd className="mt-1 text-sm text-green-600 font-medium">
                    {formatDate(utility.paidAt)}
                  </dd>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cost Summary */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <CurrencyDollarIcon className="h-5 w-5 mr-2" />
            สรุปค่าใช้จ่าย
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm font-medium text-blue-800">ค่าน้ำ</div>
              <div className="text-2xl font-bold text-blue-600 mt-1">
                {formatPrice(utility.plumbingCharge)}
              </div>
              <div className="text-sm text-blue-600 mt-1">
                {utility.plumbingUsage} หน่วย
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-sm font-medium text-orange-800">ค่าไฟ</div>
              <div className="text-2xl font-bold text-orange-600 mt-1">
                {formatPrice(utility.electricityCharge)}
              </div>
              <div className="text-sm text-orange-600 mt-1">
                {utility.electricityUsage} หน่วย
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm font-medium text-green-800">
                รวมทั้งหมด
              </div>
              <div className="text-2xl font-bold text-green-600 mt-1">
                {formatPrice(totalCharge)}
              </div>
              <div className="text-sm text-green-600 mt-1">
                {utility.paidAt ? "ชำระแล้ว" : "ยังไม่ชำระ"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUtilityPage;
