"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BackButton from "@/components/BackButton";
import { RoomStatus } from "@/interface/RoomV2";
import useRoomV2 from "@/api/room/useRoomV2";
import useApartmentV2 from "@/api/apartment/useApartmentV2";
import { PencilIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

interface RoomViewV2Props {
  id: string;
}

const RoomViewV2 = ({ id }: RoomViewV2Props) => {
  const router = useRouter();
  const { data: room, isLoading, error } = useRoomV2(id);
  const { data: apartment } = useApartmentV2(room?.apartmentId || "");

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถโหลดข้อมูลห้องพักได้",
        icon: "error",
        confirmButtonText: "กลับไปหน้ารายการ"
      }).then(() => {
        router.push("/adminv2/rooms");
      });
    }
  }, [error, router]);

  const getStatusColor = (status: RoomStatus) => {
    switch (status) {
      case RoomStatus.AVAILABLE:
        return "bg-green-100 text-green-800";
      case RoomStatus.RESERVED:
        return "bg-yellow-100 text-yellow-800";
      case RoomStatus.RENTED:
        return "bg-blue-100 text-blue-800";
      case RoomStatus.INACTIVE:
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: RoomStatus) => {
    switch (status) {
      case RoomStatus.AVAILABLE:
        return "ว่าง";
      case RoomStatus.RESERVED:
        return "จอง";
      case RoomStatus.RENTED:
        return "เช่าแล้ว";
      case RoomStatus.INACTIVE:
        return "ไม่ใช้งาน";
      default:
        return status;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">กำลังโหลดข้อมูลห้องพัก...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!room) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            รายละเอียดห้องพัก - {room.no}
          </h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push(`/adminv2/rooms/edit/${room.id}`)}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              <PencilIcon className="h-4 w-4 mr-1" />
              แก้ไข
            </button>
            <BackButton href="/adminv2/rooms" />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900 border-b pb-2">
              ข้อมูลพื้นฐาน
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                หมายเลขห้อง
              </label>
              <p className="text-sm text-gray-900">{room.no}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                สถานะ
              </label>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(room.status)}`}>
                {getStatusText(room.status)}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                อพาร์ตเมนต์
              </label>
              <p className="text-sm text-gray-900">{apartment?.name || "ไม่ระบุ"}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ที่อยู่
              </label>
              <p className="text-sm text-gray-900">{room.address}</p>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900 border-b pb-2">
              ข้อมูลราคา
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ราคารายเดือน
              </label>
              <p className="text-sm font-semibold text-green-600">
                {formatPrice(room.monthlyPrice)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                เงินประกัน
              </label>
              <p className="text-sm font-semibold text-blue-600">
                {formatPrice(room.securityDeposit)}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        {room.description && (
          <div className="mt-6">
            <h3 className="text-md font-semibold text-gray-900 border-b pb-2 mb-4">
              รายละเอียด
            </h3>
            <p className="text-sm text-gray-900 whitespace-pre-wrap">
              {room.description}
            </p>
          </div>
        )}

        {/* Timestamps */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500">
            <div>
              <span className="font-medium">สร้างเมื่อ:</span>{" "}
              {room.createdAt ? new Date(room.createdAt).toLocaleString("th-TH") : "ไม่ระบุ"}
            </div>
            <div>
              <span className="font-medium">แก้ไขล่าสุด:</span>{" "}
              {room.updatedAt ? new Date(room.updatedAt).toLocaleString("th-TH") : "ไม่ระบุ"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomViewV2;
