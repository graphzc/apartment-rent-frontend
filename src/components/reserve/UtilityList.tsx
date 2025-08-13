import useBookingUtilities from "@/api/utility/useBookingUtilities";
import BookingUtility from "@/interface/BookingUtility";
import { thDateString } from "@/utils/thDateConvertor";
import { formatPrice } from "@/utils/utilityCalculator";
import UtilityCalculator from "@/components/utility/UtilityCalculator";
import useMyBookingDetail from "@/api/booking/useMyBookingDetail";

interface UtilityListProps {
  bookingId: string;
  onSelectUtility: (utilityId: string) => void;
}

export default function UtilityList({
  bookingId,
  onSelectUtility,
}: UtilityListProps) {
  const { data: utilities, isPending, error } = useBookingUtilities(bookingId);
  const {
    data: booking,
    isPending: isBookingPending,
    error: bookingError,
  } = useMyBookingDetail(bookingId || "");

  if (isPending || isBookingPending) {
    return <div>กำลังโหลด...</div>;
  }

  if (error) {
    return <div>เกิดข้อผิดพลาด: {error.message}</div>;
  }

  if (bookingError) {
    return (
      <div>เกิดข้อผิดพลาดในการโหลดข้อมูลการจอง: {bookingError.message}</div>
    );
  }

  if (!utilities || utilities.length === 0) {
    return <div className="text-gray-500">ไม่มีข้อมูลสาธารณูปโภค</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">รายการสาธารณูปโภค</h2>
      <div className="space-y-4">
        {/* Utility Calculator */}
        {utilities.length > 0 && (
          <UtilityCalculator
            plumbingUnitPrice={booking.price.plumbingPrice}
            electricityUnitPrice={booking.price.electricityPrice}
            latestElectricityUsage={
              utilities.length > 0
                ? utilities[utilities.length - 1].electricityUsage
                : 0
            }
            latestPlumbingUsage={
              utilities.length > 0
                ? utilities[utilities.length - 1].plumbingUsage
                : 0
            }
          />
        )}
        {utilities.map((utility: BookingUtility) => (
          <div
            key={utility.id}
            className="border border-gray-300 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onSelectUtility(utility.id)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-semibold text-lg mb-2">
                  ค่าสาธารณูปโภค - {thDateString(utility.createdAt)}
                </div>
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">ค่าน้ำ:</span>{" "}
                      {formatPrice(utility.plumbingCharge)} บาท (
                      {utility.plumbingUsage} หน่วย)
                      <div className="text-xs text-blue-500">
                        @ {formatPrice(booking.price.plumbingPrice)} บาท/หน่วย
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">ค่าไฟ:</span>{" "}
                      {formatPrice(utility.electricityCharge)} บาท (
                      {utility.electricityUsage} หน่วย)
                      <div className="text-xs text-orange-500">
                        @ {formatPrice(booking.price.electricityPrice)}{" "}
                        บาท/หน่วย
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="font-medium">รวม:</span>{" "}
                  {formatPrice(
                    utility.plumbingCharge + utility.electricityCharge
                  )}{" "}
                  บาท
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`inline-block px-2 py-1 rounded text-sm ${
                    utility.paidAt
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {utility.paidAt ? "ชำระแล้ว" : "ยังไม่ชำระ"}
                </div>
                {utility.paidAt && (
                  <div className="text-xs text-gray-500 mt-1">
                    {thDateString(utility.paidAt)}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
