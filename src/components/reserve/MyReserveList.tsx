import useMyBooking from "@/api/booking/useMyBooking";
import { thDateString } from "@/utils/thDateConvertor";
import { getBookingStatusDisplay } from "@/utils/bookingStatusUtils";
import { BookingStatus } from "@/enum/BookingStatus";
import Link from "next/link";
import { useState } from "react";

export default function MyReserveList() {
  const { data: reserves, isLoading, error } = useMyBooking();
  const [showTerminated, setShowTerminated] = useState<boolean>(true);

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

  if (!reserves || reserves.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg text-gray-500">ไม่มีการจองห้องพัก</div>
      </div>
    );
  }

  // Filter out terminated bookings if showTerminated is false
  const filteredReserves = reserves.filter(
    (reserve) => showTerminated || reserve.status !== BookingStatus.Terminated
  );

  return (
    <div>
      <div className="mb-4 flex items-center">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showTerminated}
            onChange={() => setShowTerminated(!showTerminated)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900">
            แสดงการจองที่สิ้นสุด
          </span>
        </label>
      </div>

      <div className="space-y-4">
        {filteredReserves.length === 0 ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-lg text-gray-500">ไม่มีการจอง</div>
          </div>
        ) : (
          filteredReserves.map((reserve) => {
            const statusDisplay = getBookingStatusDisplay(reserve.status);
            return (
              <Link
                href={`/reserve/my/${reserve.id}`}
                className="block border border-gray-300 hover:border-black-600 rounded-lg p-6 transition-all duration-200 hover:shadow-md bg-white"
                key={reserve.id}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-lg font-semibold text-gray-800 mb-2">
                      {reserve.apartmentInfo.name}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>
                        <span className="font-medium">ห้อง:</span>{" "}
                        {reserve.roomInfo.no}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>
                      <span className="font-medium">ระยะเวลา:</span>
                    </div>
                    <div className="text-blue-600">
                      {thDateString(reserve.startDate)} -{" "}
                      {thDateString(reserve.endDate)}
                    </div>
                    <div>
                      <span className="font-medium">สถานะ:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded text-xs ${statusDisplay.className}`}
                      >
                        {statusDisplay.text}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
