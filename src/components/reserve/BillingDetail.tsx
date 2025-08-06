import useBillingDetail from "@/api/billing/useBillingDetail";

interface BillingDetailProps {
  billingId: string;
  onBack: () => void;
}

const BillingDetail = ({ billingId, onBack }: BillingDetailProps) => {
  const { data: bill, isLoading } = useBillingDetail(billingId);

  if (isLoading || !bill)
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {/* Header */}
      <div className="border-b pb-4 mb-6">
        <button
          className="text-blue-600 hover:text-blue-800 text-sm mb-2 flex items-center"
          onClick={onBack}
        >
          ← กลับไปที่รายการบิล
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          ใบแจ้งชำระเงิน {bill.billingReference}
        </h2>
        <p className="text-sm text-gray-600 mt-1">ผู้ใช้งาน: {bill.userName}</p>
      </div>

      {/* Bill Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              จำนวนเงิน
            </label>
            <div className="text-3xl font-bold text-green-600">
              {bill.amount?.toLocaleString() || 0} บาท
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              สถานะการชำระเงิน
            </label>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                bill.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-800"
                  : bill.status === "PAID"
                  ? "bg-green-100 text-green-800"
                  : bill.status === "OVERDUE"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {bill.status === "PENDING"
                ? "รอชำระ"
                : bill.status === "PAID"
                ? "ชำระแล้ว"
                : bill.status === "OVERDUE"
                ? "เกินกำหนด"
                : bill.status}
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ประเภทการชำระ
            </label>
            <div className="text-gray-900">
              {bill.type === "FIRST_TIME_BOOKING" ? "จองครั้งแรก" : bill.type}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              วันครบกำหนดชำระ
            </label>
            <div className="text-gray-900">
              {new Date(bill.dueDate).toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {new Date(bill.dueDate) < new Date() && (
                <span className="ml-2 text-red-600 font-medium">
                  (เกินกำหนด)
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              วันที่สร้างใบแจ้งหนี้
            </label>
            <div className="text-gray-900">
              {new Date(bill.createdAt).toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              วันที่อัปเดตล่าสุด
            </label>
            <div className="text-gray-900">
              {new Date(bill.updatedAt).toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      {bill.paymentHistory && bill.paymentHistory.length > 0 && (
        <div className="border-t pt-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            ประวัติการชำระเงิน
          </h3>
          <div className="space-y-2">
            {bill.paymentHistory.map((payment, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-700">
                  Payment history item {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Slip Upload */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          อัปโหลดสลิปการชำระเงิน
        </h3>

        <div className="flex items-center space-x-4">
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-medium
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            อัปโหลด
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingDetail;
