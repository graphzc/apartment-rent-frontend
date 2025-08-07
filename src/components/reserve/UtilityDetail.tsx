import useBookingUtility from "@/api/utility/useBookingUtility";
import BookingUtility from "@/interface/BookingUtility";
import { thDateString } from "@/utils/thDateConvertor";
import {
  getPlumbingUnitPrice,
  getElectricityUnitPrice,
  formatPrice,
  calculateTotalCharge,
} from "@/utils/utilityCalculator";

interface UtilityDetailProps {
  utilityId: string;
  onBack: () => void;
}

export default function UtilityDetail({
  utilityId,
  onBack,
}: UtilityDetailProps) {
  const { data: utility, isLoading, error } = useBookingUtility(utilityId);

  if (isLoading) {
    return <div>กำลังโหลด...</div>;
  }

  if (error) {
    return <div>เกิดข้อผิดพลาด: {error.message}</div>;
  }

  if (!utility) {
    return <div>ไม่พบข้อมูลสาธารณูปโภค</div>;
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 text-blue-600 hover:text-blue-800 font-medium"
      >
        ← กลับไปรายการสาธารณูปโภค
      </button>

      <h2 className="text-2xl font-bold mb-6">รายละเอียดค่าสาธารณูปโภค</h2>

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-2">ข้อมูลทั่วไป</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-gray-600">รหัสใบแจ้ง:</span>
              <div>{utility.id}</div>
            </div>
            <div>
              <span className="font-medium text-gray-600">รหัสการจอง:</span>
              <div>{utility.bookingId}</div>
            </div>
            <div>
              <span className="font-medium text-gray-600">รหัสบิล:</span>
              <div>{utility.billingId}</div>
            </div>
            <div>
              <span className="font-medium text-gray-600">วันที่บันทึก:</span>
              <div>{thDateString(utility.createdAt)}</div>
            </div>
            <div>
              <span className="font-medium text-gray-600">สถานะการชำระ:</span>
              <div
                className={`inline-block px-2 py-1 rounded text-sm ${
                  utility.paidAt
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {utility.paidAt ? "ชำระแล้ว" : "ยังไม่ชำระ"}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-2">ค่าน้ำประปา</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="font-medium text-gray-600">จำนวนหน่วย:</span>
              <div className="text-lg">{utility.plumbingUsage} หน่วย</div>
            </div>
            <div>
              <span className="font-medium text-gray-600">ราคาต่อหน่วย:</span>
              <div className="text-lg text-blue-500">
                {formatPrice(getPlumbingUnitPrice(utility))} บาท/หน่วย
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-600">ค่าใช้จ่าย:</span>
              <div className="text-lg font-semibold text-blue-600">
                {formatPrice(utility.plumbingCharge)} บาท
              </div>
            </div>
          </div>
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-700">
              <strong>การคำนวณ:</strong> {utility.plumbingUsage} หน่วย ×{" "}
              {formatPrice(getPlumbingUnitPrice(utility))} บาท/หน่วย ={" "}
              {formatPrice(
                calculateTotalCharge(
                  getPlumbingUnitPrice(utility),
                  utility.plumbingUsage
                )
              )}{" "}
              บาท
            </div>
          </div>
        </div>

        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-2">ค่าไฟฟ้า</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="font-medium text-gray-600">จำนวนหน่วย:</span>
              <div className="text-lg">{utility.electricityUsage} หน่วย</div>
            </div>
            <div>
              <span className="font-medium text-gray-600">ราคาต่อหน่วย:</span>
              <div className="text-lg text-orange-500">
                {formatPrice(getElectricityUnitPrice(utility))} บาท/หน่วย
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-600">ค่าใช้จ่าย:</span>
              <div className="text-lg font-semibold text-blue-600">
                {formatPrice(utility.electricityCharge)} บาท
              </div>
            </div>
          </div>
          <div className="mt-3 p-3 bg-orange-50 rounded-lg">
            <div className="text-sm text-orange-700">
              <strong>การคำนวณ:</strong> {utility.electricityUsage} หน่วย ×{" "}
              {formatPrice(getElectricityUnitPrice(utility))} บาท/หน่วย ={" "}
              {formatPrice(
                calculateTotalCharge(
                  getElectricityUnitPrice(utility),
                  utility.electricityUsage
                )
              )}{" "}
              บาท
            </div>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">ยอดรวมทั้งหมด</h3>
            <div className="text-2xl font-bold text-green-600">
              {formatPrice(utility.plumbingCharge + utility.electricityCharge)}{" "}
              บาท
            </div>
          </div>
          <div className="mt-2 p-3 bg-green-50 rounded-lg">
            <div className="text-sm text-green-700">
              <strong>สรุปการคำนวณ:</strong> ค่าน้ำ{" "}
              {formatPrice(utility.plumbingCharge)} บาท + ค่าไฟ{" "}
              {formatPrice(utility.electricityCharge)} บาท ={" "}
              {formatPrice(utility.plumbingCharge + utility.electricityCharge)}{" "}
              บาท
            </div>
          </div>
        </div>

        {utility.paidAt && (
          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold mb-2">ข้อมูลการชำระเงิน</h3>
            <div>
              <span className="font-medium text-gray-600">วันที่ชำระ:</span>
              <div className="text-green-600 font-medium">
                {thDateString(utility.paidAt)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
