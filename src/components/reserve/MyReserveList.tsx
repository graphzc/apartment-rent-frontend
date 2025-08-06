import useMyBooking from "@/api/booking/useMyBooking";
import { thDateString } from "@/utils/thDateConvertor";
import { getBookingStatusDisplay } from "@/utils/bookingStatusUtils";
import Link from "next/link";

export default function MyReserveList() {
  const { data: reserves, isLoading, error } = useMyBooking();

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

  return (
    <div className="space-y-4">
      {reserves?.map((reserve) => {
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
      })}
    </div>
  );
}
