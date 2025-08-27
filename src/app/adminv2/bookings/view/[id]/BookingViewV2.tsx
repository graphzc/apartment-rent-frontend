"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BackButton from "@/components/BackButton";
import useBookingV2 from "@/api/booking/useBookingV2";
import useTerminateBooking from "@/api/booking/useTerminateBooking";
import Swal from "sweetalert2";
import {
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  CurrencyDollarIcon,
  HomeIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";

interface BookingViewV2Props {
  id: string;
}

const BookingViewV2 = ({ id }: BookingViewV2Props) => {
  const router = useRouter();
  const { data: booking, isLoading, error } = useBookingV2(id);
  const terminateBookingMutation = useTerminateBooking();

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถโหลดข้อมูลการจองได้",
        icon: "error",
        confirmButtonText: "กลับไปหน้ารายการ",
      }).then(() => {
        router.push("/adminv2/bookings");
      });
    }
  }, [error, router]);

  const handleTerminateBooking = () => {
    Swal.fire({
      title: "ยืนยันการยกเลิกการเช่า",
      text: "คุณต้องการยกเลิกการเช่านี้ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ยกเลิกการเช่า",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        terminateBookingMutation.mutate(id, {
          onSuccess: (data) => {
            Swal.fire({
              title: "สำเร็จ!",
              text: "ยกเลิกการเช่าเรียบร้อยแล้ว",
              icon: "success",
              confirmButtonText: "ตกลง",
            });
          },
          onError: (error) => {
            Swal.fire({
              title: "เกิดข้อผิดพลาด!",
              text: "ไม่สามารถยกเลิกการเช่าได้",
              icon: "error",
              confirmButtonText: "ตกลง",
            });
          },
        });
      }
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateOnly = (date: Date) => {
    return new Date(date).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING_FOR_PAYMENT":
        return "bg-yellow-100 text-yellow-800";
      case "SUCCESS":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "TERMINATED":
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING_FOR_PAYMENT":
        return "รอชำระเงิน";
      case "SUCCESS":
        return "อยู่ในการเช่า";
      case "CANCELLED":
        return "ยกเลิก";
      case "TERMINATED":
        return "สิ้นสุด";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return <CheckCircleIcon className="h-4 w-4" />;
      case "PENDING_FOR_PAYMENT":
        return <ClockIcon className="h-4 w-4" />;
      case "CANCELLED":
        return <XCircleIcon className="h-4 w-4" />;
      case "TERMINATED":
        return <NoSymbolIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">กำลังโหลดข้อมูลการจอง...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-900">
                การจอง #{booking.id}
              </h2>
              <div className="flex items-center space-x-2">
                <span
                  className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {getStatusIcon(booking.status)}
                  <span className="ml-1">{getStatusText(booking.status)}</span>
                </span>
                {booking.isAcceptedContract ? (
                  <span className="inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                    ยอมรับสัญญาแล้ว
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    รอยอมรับสัญญา
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.push(`/contract/${booking.id}`)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <DocumentTextIcon className="h-4 w-4 mr-1" />
                ดูสัญญา
              </button>
              {booking.status === "SUCCESS" && (
                <button
                  onClick={handleTerminateBooking}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  disabled={terminateBookingMutation.isPending}
                >
                  {terminateBookingMutation.isPending ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                  ) : (
                    <NoSymbolIcon className="h-4 w-4 mr-1" />
                  )}
                  ยกเลิกการเช่า
                </button>
              )}
              <BackButton href="/adminv2/bookings" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Information */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <UserIcon className="h-5 w-5 mr-2" />
              ข้อมูลผู้เช่า
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <UserIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  ชื่อ-นามสกุล
                </p>
                <p className="text-sm text-gray-900">{booking.userInfo.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-700">อีเมล</p>
                <p className="text-sm text-gray-900">
                  {booking.userInfo.email}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <PhoneIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  เบอร์โทรศัพท์
                </p>
                <p className="text-sm text-gray-900">
                  {booking.userInfo.telephone}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">ที่อยู่</p>
                <p className="text-sm text-gray-900">
                  {booking.userInfo.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Room & Apartment Information */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <HomeIcon className="h-5 w-5 mr-2" />
              ข้อมูลห้องพัก
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700">อพาร์ตเมนต์</p>
              <p className="text-sm text-gray-900">
                {booking.apartmentInfo.name}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">หมายเลขห้อง</p>
              <p className="text-sm text-gray-900 font-semibold">
                {booking.roomInfo.no}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">ที่อยู่ห้อง</p>
              <p className="text-sm text-gray-900">
                {booking.roomInfo.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Period */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <CalendarDaysIcon className="h-5 w-5 mr-2" />
            ระยะเวลาการเช่า
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-700">
                วันที่เริ่มต้น
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {formatDateOnly(booking.startDate)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">วันที่สิ้นสุด</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatDateOnly(booking.endDate)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Information */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <CurrencyDollarIcon className="h-5 w-5 mr-2" />
            ข้อมูลราคา
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-700">
                ค่าเช่ารายเดือน
              </p>
              <p className="text-2xl font-bold text-blue-900">
                {formatPrice(booking.price.monthlyRent)}
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-700">เงินประกัน</p>
              <p className="text-2xl font-bold text-green-900">
                {formatPrice(booking.price.securityDeposit)}
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-purple-700">
                ยอดชำระครั้งแรก
              </p>
              <p className="text-2xl font-bold text-purple-900">
                {formatPrice(booking.price.totalFirstPay)}
              </p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-sm font-medium text-orange-700">ค่าประปา</p>
              <p className="text-lg font-semibold text-orange-900">
                {formatPrice(booking.price.plumbingPrice)}
              </p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm font-medium text-yellow-700">ค่าไฟ</p>
              <p className="text-lg font-semibold text-yellow-900">
                {formatPrice(booking.price.electricityPrice)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timestamps */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            ข้อมูลการทำรายการ
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
            <div>
              <span className="font-medium">สร้างเมื่อ:</span>{" "}
              {formatDate(booking.createdAt)}
            </div>
            <div>
              <span className="font-medium">แก้ไขล่าสุด:</span>{" "}
              {formatDate(booking.updatedAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingViewV2;
