"use client";

import useMyBookingDetail from "@/api/booking/useMyBookingDetail";
import { BookingStatus } from "@/enum/BookingStatus";
import { thDateString, thDateTimeString } from "@/utils/thDateConvertor";
import { getBookingStatusDisplay } from "@/utils/bookingStatusUtils";
import Link from "next/link";

interface ReserveInfoProps {
  id: string;
}

export default function ReserveInfo({ id }: ReserveInfoProps) {
  const { data: booking, isLoading, error } = useMyBookingDetail(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg">กำลังโหลด...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg text-red-500">
          เกิดข้อผิดพลาดในการโหลดข้อมูล
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg text-gray-500">ไม่พบข้อมูลการจอง</div>
      </div>
    );
  }

  const statusDisplay = getBookingStatusDisplay(booking.status);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        href="/reserve/my"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        ← กลับไปรายการจอง
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">
                {booking.apartmentInfo.name}
              </h2>
              <p className="text-blue-100 mt-1">ห้อง {booking.roomInfo.no}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Status */}
          <div className="mb-6">
            <span className="text-sm font-medium text-gray-600">
              สถานะการจอง:{" "}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${statusDisplay.className}`}
            >
              {statusDisplay.text}
            </span>
          </div>

          {/* Booking Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">
                  ข้อมูลห้องพัก
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">
                      หมายเลขห้อง:
                    </span>
                    <span className="ml-2">{booking.roomInfo.no}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">ที่อยู่:</span>
                    <span className="ml-2">{booking.roomInfo.address}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">
                  ข้อมูลผู้เช่า
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">ชื่อ:</span>
                    <span className="ml-2">{booking.userInfo.name}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">เบอร์โทร:</span>
                    <span className="ml-2">{booking.userInfo.telephone}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">อีเมล:</span>
                    <span className="ml-2">{booking.userInfo.email}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">ที่อยู่:</span>
                    <span className="ml-2">{booking.userInfo.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">
                  ระยะเวลาเช่า
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">
                      วันที่เริ่มต้น:
                    </span>
                    <span className="ml-2 text-blue-600">
                      {thDateString(booking.startDate)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">
                      วันที่สิ้นสุด:
                    </span>
                    <span className="ml-2 text-blue-600">
                      {thDateString(booking.endDate)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">ข้อมูลราคา</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      ค่าเช่ารายเดือน:
                    </span>
                    <span>
                      {booking.price.monthlyRent.toLocaleString()} บาท
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      เงินมัดจำ:
                    </span>
                    <span>
                      {booking.price.securityDeposit.toLocaleString()} บาท
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">ค่าน้ำ:</span>
                    <span>{booking.price.plumbingPrice} บาท/หน่วย</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">ค่าไฟ:</span>
                    <span>{booking.price.electricityPrice} บาท/หน่วย</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold text-gray-800">
                      <span>ยอดชำระครั้งแรก:</span>
                      <span className="text-green-600">
                        {booking.price.totalFirstPay.toLocaleString()} บาท
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contract Status */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex items-center">
              <span className="font-medium text-gray-700">สถานะสัญญา:</span>
              <span
                className={`ml-2 px-2 py-1 rounded text-sm ${
                  booking.isAcceptedContract
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {booking.isAcceptedContract
                  ? "ยอมรับสัญญาแล้ว"
                  : "รอการยอมรับสัญญา"}
              </span>
            </div>
          </div>

          {/* Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
            <div>
              <span className="font-medium">วันที่สร้าง:</span>
              <span className="ml-2">
                {thDateTimeString(booking.createdAt)}
              </span>
            </div>
            <div>
              <span className="font-medium">อัปเดตล่าสุด:</span>
              <span className="ml-2">
                {thDateTimeString(booking.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
