"use client";

import { useRouter, useParams } from "next/navigation";
import useApartmentV2 from "@/api/apartment/useApartmentV2";
import useDeleteApartmentV2 from "@/api/apartment/useDeleteApartmentV2";
import {
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

const ViewApartmentPage = () => {
  const router = useRouter();
  const params = useParams();
  const apartmentId = params.id as string;

  const { data: apartment, isLoading, error } = useApartmentV2(apartmentId);
  const deleteApartment = useDeleteApartmentV2();

  const handleDelete = async () => {
    if (!apartment) return;

    const result = await Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: `คุณกำลังจะลบ "${apartment.name}" การดำเนินการนี้ไม่สามารถยกเลิกได้`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      try {
        await deleteApartment.mutateAsync(apartmentId);
        router.push("/adminv2/apartments");
      } catch (error) {
        // Error is handled in the hook
      }
    }
  };

  const handleEdit = () => {
    router.push(`/adminv2/apartments/edit/${apartmentId}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900">
            รายละเอียดอพาร์ตเมนต์
          </h1>
          <p className="text-red-600 mt-4">
            เกิดข้อผิดพลาดในการโหลดข้อมูลอพาร์ตเมนต์: {error.message}
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900">
            รายละเอียดอพาร์ตเมนต์
          </h1>
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

  if (!apartment) {
    return (
      <div className="space-y-6">
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900">
            รายละเอียดอพาร์ตเมนต์
          </h1>
          <p className="text-gray-600 mt-4">ไม่พบข้อมูลอพาร์ตเมนต์</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.push("/adminv2/apartments")}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {apartment.name}
                </h1>
                <p className="text-gray-600">รายละเอียดอพาร์ตเมนต์</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PencilIcon className="h-4 w-4 mr-1" />
                แก้ไข
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteApartment.isPending}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <TrashIcon className="h-4 w-4 mr-1" />
                {deleteApartment.isPending ? "กำลังลบ..." : "ลบ"}
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  ข้อมูลพื้นฐาน
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ชื่อ
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {apartment.name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      รายละเอียด
                    </label>
                    <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                      {apartment.description}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      รหัสอพาร์ตเมนต์
                    </label>
                    <p className="mt-1 text-sm text-gray-500 font-mono">
                      {apartment.id}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  ข้อมูลราคา
                </h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <CurrencyDollarIcon className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">
                          ราคาน้ำประปา
                        </p>
                        <p className="text-xl font-semibold text-blue-900">
                          {formatPrice(apartment.plumbingPrice)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <CurrencyDollarIcon className="h-5 w-5 text-green-600 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-green-900">
                          ราคาไฟฟ้า
                        </p>
                        <p className="text-xl font-semibold text-green-900">
                          {formatPrice(apartment.electricityPrice)}/หน่วย
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              ข้อมูลเวลา
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    วันที่สร้าง
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(apartment.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    แก้ไขล่าสุด
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(apartment.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApartmentPage;
